//
//  TarotReadingView.swift
//  SoulCards
//
//  Created by 陳冠廷 on 2025/1/24.
//

import SwiftUI
import SwiftData
import Combine

// MARK: - ScrollCoordinator Actor

/// 統一滾動管理器，確保滾動行為一致和流暢
actor ScrollCoordinator {
    private var currentAnchor: String?
    private var isScrolling = false
    
    /// 統一的滾動方法，支持延遲和動畫
    func scrollTo(_ anchor: String, 
                  proxy: ScrollViewProxy, 
                  delay: TimeInterval = 0.5,
                  duration: TimeInterval = 1.0,
                  anchorPoint: UnitPoint = .top) async {
        // 防止重複滾動到同一位置
        guard currentAnchor != anchor || !isScrolling else { return }
        
        currentAnchor = anchor
        isScrolling = true
        
        // 延遲滾動
        if delay > 0 {
            try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
        }
        
        // 在主線程執行滾動動畫
        await MainActor.run {
            withAnimation(.easeInOut(duration: duration)) {
                proxy.scrollTo(anchor, anchor: anchorPoint)
            }
        }
        
        // 等待動畫完成
        try? await Task.sleep(nanoseconds: UInt64(duration * 1_000_000_000))
        isScrolling = false
    }
    
    /// 重置滾動狀態
    func reset() {
        currentAnchor = nil
        isScrolling = false
    }
    
    /// 獲取當前錨點
    func getCurrentAnchor() -> String? {
        return currentAnchor
    }
}

// MARK: - Enhanced Data Models

// 占卜階段枚舉
enum ReadingPhase: String, CaseIterable {
    case preparation = "preparation"
    case shuffling = "shuffling"
    case drawing = "drawing"
    case layout = "layout"
    case revealing = "revealing"
    case analysis = "analysis"
    
    var displayName: String {
        switch self {
        case .preparation: return "準備階段"
        case .shuffling: return "洗牌儀式"
        case .drawing: return "抽牌互動"
        case .layout: return "牌陣佈局"
        case .revealing: return "翻牌揭示"
        case .analysis: return "解讀分析"
        }
    }
    
    var description: String {
        switch self {
        case .preparation: return "專注於問題，選擇適合的牌陣"
        case .shuffling: return "洗牌營造神聖氛圍，準備抽牌"
        case .drawing: return "從牌堆中抽取所需的卡牌"
        case .layout: return "按照牌陣形狀排列卡牌"
        case .revealing: return "按順序翻開卡牌，揭示訊息"
        case .analysis: return "AI深度分析，提供人生指導"
        }
    }
}

// 牌陣重要性等級
enum SpreadImportance: String, Codable, CaseIterable {
    case primary = "primary"
    case secondary = "secondary"
    case supporting = "supporting"
    
    var displayName: String {
        switch self {
        case .primary: return "核心位置"
        case .secondary: return "重要位置"
        case .supporting: return "輔助位置"
        }
    }
}

// 牌陣位置定義
struct SpreadPosition: Codable, Identifiable {
    let id: UUID
    let index: Int
    let name: String
    let meaning: String
    let importance: SpreadImportance
    let relativePosition: CGPoint
    
    init(index: Int, name: String, meaning: String, importance: SpreadImportance, relativePosition: CGPoint) {
        self.id = UUID()
        self.index = index
        self.name = name
        self.meaning = meaning
        self.importance = importance
        self.relativePosition = relativePosition
    }
}

// 牌陣配置
struct SpreadConfiguration: Codable, Identifiable {
    let id: UUID
    let type: String
    let name: String
    let description: String
    let cardCount: Int
    let positions: [SpreadPosition]
    let revealOrder: [Int]
    let suitableFor: [String]
    let difficultyLevel: Int
    let isPremium: Bool
    
    init(type: String, name: String, description: String, cardCount: Int, positions: [SpreadPosition], revealOrder: [Int], suitableFor: [String], difficultyLevel: Int = 1, isPremium: Bool = false) {
        self.id = UUID()
        self.type = type
        self.name = name
        self.description = description
        self.cardCount = cardCount
        self.positions = positions
        self.revealOrder = revealOrder
        self.suitableFor = suitableFor
        self.difficultyLevel = difficultyLevel
        self.isPremium = isPremium
    }
}

struct TarotReadingView: View {
    let divinationType: DivinationType
    
    @Environment(\.modelContext) private var modelContext
    @EnvironmentObject private var permissionManager: PermissionManager
    @EnvironmentObject private var userSession: UserSession
    @EnvironmentObject private var databaseService: DatabaseService
    
    @State private var question: String = ""
    @State private var selectedReadingType: ReadingType = .single
    @State private var drawnCards: [DrawnCard] = []
    
    // MARK: - DrawnCard Definition
    struct DrawnCard: Identifiable, Codable {
        let id: UUID
        let card: TarotCard
        let isReversed: Bool
        let position: String
        let positionIndex: Int
        let spreadType: ReadingType
        var isRevealed: Bool = false
        var revealOrder: Int = 0
        let timestamp: Date
        let cgPosition: CGPoint
        let rotation: Double
        let scale: Double
        let isFlipped: Bool
        
        init(card: TarotCard, isReversed: Bool, position: String, positionIndex: Int = 0, 
             spreadType: ReadingType = .single, cgPosition: CGPoint = .zero, 
             rotation: Double = 0, scale: Double = 1.0, isFlipped: Bool = false) {
            self.id = UUID()
            self.card = card
            self.isReversed = isReversed
            self.position = position
            self.positionIndex = positionIndex
            self.spreadType = spreadType
            self.timestamp = Date()
            self.cgPosition = cgPosition
            self.rotation = rotation
            self.scale = scale
            self.isFlipped = isFlipped
        }
    }
    
    @State private var showResult = false
    @State private var aiAnalysis = ""
    @State private var isAnalyzing = false
    @State private var showError = false
    @State private var errorMessage = ""
    @State private var analysisError: String?
    @State private var animateCards = false
    @State private var showShimmer = false
    @State private var showingUpgrade = false
    @State private var flippedCardsCount = 0
    @State private var allCardsFlipped = false
    
    @State private var isReadingLocked = false
    @State private var displayedAnalysis = ""
    @State private var currentPhase: ReadingPhase = .preparation
    @State private var isDisplayingAnalysis = false
    
    // 簡化的顯示狀態
    @State private var fullAnalysisText: String = ""
    
    @StateObject private var animationManager = AnimationManager()
    @ObservedObject private var audioManager = AudioManager.shared
    
    // 🔧 新增：性能配置
    @StateObject private var performanceConfig = PerformanceConfig.shared
    @StateObject private var performanceMonitor = PerformanceMonitor.shared
    
    @State private var selectedCards: Set<UUID> = []
    @State private var revealedCards: Set<UUID> = []
    @State private var spreadConfiguration: SpreadConfiguration?
    @State private var showShareSheet = false
    @State private var shareItems: [Any] = []
    @State private var isDrawing = false
    @State private var scrollProxy: ScrollViewProxy?
    
    // 🔧 新增：性能優化狀態
    @State private var shouldReduceAnimations = false
    @State private var currentAnimationLevel: Int = 3 // 1=最低, 2=中等, 3=最高
    
    // 🔧 新增：滾動協調器，統一管理滾動行為
    private let scrollCoordinator = ScrollCoordinator()
    
    enum ReadingType: String, CaseIterable, Codable {
        case single = "single"
        case threeCard = "three_card"
        case fourCard = "four_card"
        case choice = "choice"
        case diamond = "diamond"
        case celticCross = "celtic_cross"
        
        var displayName: String {
            switch self {
            case .single: return "單張指引"
            case .threeCard: return "三張時光"
            case .fourCard: return "四張全析"
            case .choice: return "二擇一陣"
            case .diamond: return "鑽石牌陣"
            case .celticCross: return "凱爾特十字"
            }
        }
        
        var cardCount: Int {
            switch self {
            case .single: return 1
            case .threeCard: return 3
            case .fourCard: return 4
            case .choice: return 5
            case .diamond: return 5
            case .celticCross: return 10
            }
        }
        
        var color: Color {
            switch self {
            case .single: return .gold
            case .threeCard: return .mysticalPurple
            case .fourCard: return .starSilver
            case .choice: return .blue
            case .diamond: return .pink
            case .celticCross: return .mysticalBlue
            }
        }
        
        var description: String {
            switch self {
            case .single: return "適合日常指引和簡單問題"
            case .threeCard: return "探索過去、現在、未來的時間線"
            case .fourCard: return "深入分析問題的四個面向"
            case .choice: return "面臨重要選擇時的決策輔助"
            case .diamond: return "全面生活分析和重要決策"
            case .celticCross: return "人生重大問題的全方位解析"
            }
        }
        
        var suitableFor: [String] {
            switch self {
            case .single: return ["日常指引", "簡單問題", "每日運勢"]
            case .threeCard: return ["時間線分析", "問題發展", "趨勢預測"]
            case .fourCard: return ["深度分析", "全面考量", "平衡決策"]
            case .choice: return ["重要選擇", "決策輔助", "比較分析"]
            case .diamond: return ["生活分析", "重要決策", "全面指導"]
            case .celticCross: return ["人生重大問題", "複雜情況", "深度解析"]
            }
        }
        
        var isPremium: Bool {
            switch self {
            case .single, .threeCard: return false
            case .fourCard, .choice, .diamond, .celticCross: return true
            }
        }
    }
    
    var body: some View {
        ZStack {
            // 🔧 優化：根據性能配置調整背景
            if performanceConfig.enableComplexAnimations {
                MysticalBackgroundView()
            } else {
                // 簡化背景
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color.cosmicBlack,
                        Color.mysticalPurple.opacity(0.3),
                        Color.cosmicBlack
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()
            }
            
            ScrollViewReader { proxy in
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVStack(spacing: 40) {
                        // 神秘標題區
                        headerSection
                        
                        // 問題輸入區
                        questionInputSection
                        
                        // 占卜方式選擇
                        readingTypeSection
                        
                        // 抽牌按鈕
                        drawCardButton(proxy: proxy)
                        
                        // 免費用戶占卜次數顯示
                        if permissionManager.userPermission == .free {
                            dailyLimitSection
                        }
                        
                        // 增強洗牌動畫視圖
                        if currentPhase == .shuffling {
                            EnhancedShufflingView(
                                shuffleMode: animationManager.currentShuffleMode,
                                cardCount: selectedReadingType.cardCount,
                                animationManager: animationManager
                            )
                            .frame(height: getSpreadHeight(for: selectedReadingType))
                            .padding(.horizontal, 20)
                            .transition(.opacity.combined(with: .scale))
                            .id("shufflingSection") // 🎯 洗牌區域滾動錨點
                        }
                        

                        
                        // 卡牌顯示區域 - 在洗牌階段預留空間，避免畫面跳躍
                        if currentPhase == .shuffling {
                            // 洗牌階段：預留卡牌區域空間，使用與 cardsSection 完全相同的結構
                            VStack(spacing: 24) {
                                HStack {
                                    Image(systemName: "rectangle.stack.fill")
                                        .foregroundColor(.gold.opacity(0.3))
                                        .font(.title2)
                                    Text("準備卡牌區域...")
                                        .font(.title2)
                                        .fontWeight(.semibold)
                                        .foregroundColor(.gold.opacity(0.3))
                                }
                                
                                // 模擬進度顯示區域的佔位符
                                MysticalCardContainer {
                                    VStack(spacing: 16) {
                                        HStack {
                                            Image(systemName: "hourglass")
                                                .foregroundColor(.mysticalPurple.opacity(0.3))
                                                .font(.title3)
                                            Text("準備中...")
                                                .font(.headline)
                                                .foregroundColor(.mysticalPurple.opacity(0.3))
                                                .fontWeight(.semibold)
                                        }
                                        
                                        VStack(spacing: 8) {
                                            HStack {
                                                Text("準備進度:")
                                                    .font(.subheadline)
                                                    .foregroundColor(.starSilver.opacity(0.3))
                                                Spacer()
                                                Text("0/\(selectedReadingType.cardCount)")
                                                    .font(.subheadline)
                                                    .fontWeight(.bold)
                                                    .foregroundColor(.mysticalPurple.opacity(0.3))
                                            }
                                            
                                            MysticalProgressBar(
                                                progress: 0.0,
                                                color: .mysticalPurple.opacity(0.3)
                                            )
                                        }
                                    }
                                }
                                
                                // 透明佔位符，保持與實際卡牌區域相同的高度
                                Rectangle()
                                    .fill(Color.clear)
                                    .frame(height: getSpreadHeight(for: selectedReadingType))
                            }
                            .padding(.horizontal, 20)
                            .transition(.opacity.combined(with: .scale))
                            .animation(.mysticalSpring, value: currentPhase)
                            .id("cardsSection") // 🎯 卡牌區域滾動錨點
                        } else if !drawnCards.isEmpty && (currentPhase == .layout || currentPhase == .revealing || currentPhase == .analysis) {
                            cardsSection
                                .transition(.opacity.combined(with: .scale))
                                .animation(.mysticalSpring, value: currentPhase)
                                .id("cardsSection") // 🎯 卡牌區域滾動錨點
                        }
                        
                        // AI分析結果
                        if showResult && allCardsFlipped {
                            analysisSection
                                .id("analysisSection") // 🎯 分析結果區域滾動錨點
                        }
                        
                        Spacer(minLength: 300)
                    }
                    .padding(.top)
                }
                .onAppear {
                    scrollProxy = proxy
                }
            }
        }
        .navigationTitle("")
        .navigationBarHidden(true)
        .mysticalBackground()
        .handleKeyboard()
        .sheet(isPresented: $showingUpgrade) {
            UpgradeView()
        }
        .sheet(isPresented: $showShareSheet) {
            if !shareItems.isEmpty {
                ShareSheet(items: shareItems)
            }
        }
        .alert("錯誤", isPresented: $showError) {
            Button("確定", role: .cancel) {}
        } message: {
            Text(errorMessage)
        }
        .onAppear {
            showShimmer = true
            loadTarotCards()
            
            // 監聽記憶體警告
            NotificationCenter.default.addObserver(
                forName: UIApplication.didReceiveMemoryWarningNotification,
                object: nil,
                queue: .main
            ) { _ in
                handleMemoryWarning()
            }
            
            // 監聽 app 進入背景
            NotificationCenter.default.addObserver(
                forName: UIApplication.didEnterBackgroundNotification,
                object: nil,
                queue: .main
            ) { _ in
                cleanup()
            }
            
            // 🔧 新增：監聽 app 回到前台，確保AI解讀數據正確顯示
            NotificationCenter.default.addObserver(
                forName: UIApplication.willEnterForegroundNotification,
                object: nil,
                queue: .main
            ) { _ in
                restoreAnalysisDisplay()
            }
        }
        .onDisappear {
            // 視圖消失時清理資源
            cleanup()
            
            // 移除通知監聽
            NotificationCenter.default.removeObserver(
                self,
                name: UIApplication.didReceiveMemoryWarningNotification,
                object: nil
            )
            NotificationCenter.default.removeObserver(
                self,
                name: UIApplication.didEnterBackgroundNotification,
                object: nil
            )
        }
    }
    
    // MARK: - View Components
    
    private var headerSection: some View {
        VStack(spacing: 20) {
            HStack(spacing: 30) {
                ForEach(["🌙", "✨", "🔮", "⭐", "🌟"], id: \.self) { symbol in
                    Text(symbol)
                        .font(.title)
                        .scaleEffect(showShimmer ? 1.3 : 1.0)
                        .rotationEffect(.degrees(showShimmer ? 360 : 0))
                        .animation(
                            .easeInOut(duration: 3.0)
                            .repeatForever(autoreverses: true)
                            .delay(Double.random(in: 0...1)),
                            value: showShimmer
                        )
                }
            }
            
            MysticalTitle(
                "神秘塔羅占卜",
                subtitle: "讓宇宙的智慧為你指引方向"
            )
            
            MysticalDivider()
        }
        .padding(.top, 20)
    }
    
    private var questionInputSection: some View {
        MysticalCardContainer {
            VStack(alignment: .leading, spacing: 20) {
                HStack {
                    Image(systemName: "questionmark.circle.fill")
                        .foregroundColor(.gold)
                        .font(.title2)
                        .pulseEffect()
                    Text("你想問什麼？")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.gold)
                }
                
                ZStack(alignment: .topLeading) {
                    RoundedRectangle(cornerRadius: 16)
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color.black.opacity(0.6),
                                    Color.mysticalPurple.opacity(0.1)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.gold.opacity(0.4), lineWidth: 1)
                        )
                        .frame(minHeight: 120)
                    
                    if question.isEmpty {
                        Text("在此輸入你的問題，讓塔羅為你解答...")
                            .font(.body)
                            .foregroundColor(.starSilver.opacity(0.6))
                            .padding(.top, 20)
                            .padding(.leading, 20)
                            .allowsHitTesting(false)
                    }
                    
                    TextEditor(text: $question)
                        .font(.body)
                        .foregroundColor(.starSilver)
                        .scrollContentBackground(.hidden)
                        .background(Color.clear)
                        .padding(20)
                        .frame(minHeight: 120)
                        .textInputAutocapitalization(.sentences)
                        .autocorrectionDisabled(false)
                        .disabled(isReadingLocked)
                        .opacity(isReadingLocked ? 0.6 : 1.0)
                }
            }
        }
        .padding(.horizontal, 20)
    }
    
    private var readingTypeSection: some View {
        MysticalCardContainer {
            VStack(alignment: .leading, spacing: 20) {
                HStack {
                    StarShape(points: 5, innerRadius: 8, outerRadius: 16)
                        .fill(Color.gold)
                        .frame(width: 24, height: 24)
                        .pulseEffect()
                    Text("選擇占卜方式")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.gold)
                }
                
                VStack(spacing: 16) {
                    ForEach(ReadingType.allCases, id: \.self) { type in
                        ReadingTypeCard(
                            type: type,
                            isSelected: selectedReadingType == type
                        ) {
                            if !isReadingLocked {
                                selectedReadingType = type
                                drawnCards = []
                                showResult = false
                            }
                        }
                        .disabled(isReadingLocked)
                        .opacity(isReadingLocked ? 0.6 : 1.0)
                    }
                }
            }
        }
        .padding(.horizontal, 20)
    }
    
    private func drawCardButton(proxy: ScrollViewProxy) -> some View {
        PermissionGate(feature: .basicReading) {
            EnhancedMysticalButton(
                isReadingLocked ? "占卜進行中..." : (isDrawing ? "想著你覺得重要的事情..." : "開始神秘抽牌"),
                icon: (isDrawing || isReadingLocked) ? nil : "sparkles",
                style: .gold
            ) {
                startReadingProcess(proxy: proxy)
            }
            .disabled(isDrawing || question.isEmpty || isReadingLocked)
            .opacity((question.isEmpty || isReadingLocked) ? 0.6 : 1.0)
            .floatingEffect()
        }
    }
    
    private var dailyLimitSection: some View {
        MysticalCardContainer {
            VStack(spacing: 16) {
                HStack {
                    Image(systemName: "star.circle.fill")
                        .foregroundColor(.gold)
                        .pulseEffect()
                    Text("每日占卜次數")
                        .font(.headline)
                        .foregroundColor(.gold)
                    Spacer()
                    Text("\(permissionManager.dailyReadingsUsed)/\(permissionManager.dailyReadingLimit)")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(.starSilver)
                }
                
                MysticalProgressBar(
                    progress: Double(permissionManager.dailyReadingsUsed) / Double(permissionManager.dailyReadingLimit),
                    color: .gold
                )
                
                if permissionManager.dailyReadingsUsed >= permissionManager.dailyReadingLimit {
                    HStack {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundColor(.orange)
                            .pulseEffect()
                        Text("今日占卜次數已用完，升級至高級版本享受無限占卜")
                            .font(.caption)
                            .foregroundColor(.starSilver.opacity(0.8))
                    }
                    .padding(.top, 4)
                }
            }
        }
        .padding(.horizontal, 20)
    }
    
    private var cardsSection: some View {
        VStack(spacing: 24) {
            HStack {
                Image(systemName: "rectangle.stack.fill")
                    .foregroundColor(.gold)
                    .font(.title2)
                Text("你的神秘卡牌")
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(.gold)
            }
            
            if !allCardsFlipped {
                MysticalCardContainer {
                    VStack(spacing: 16) {
                        HStack {
                            Image(systemName: "hand.tap.fill")
                                .foregroundColor(.mysticalPurple)
                                .font(.title3)
                                .pulseEffect()
                            Text("點擊卡牌翻開查看結果")
                                .font(.headline)
                                .foregroundColor(.mysticalPurple)
                                .fontWeight(.semibold)
                        }
                        
                        VStack(spacing: 8) {
                            HStack {
                                Text("翻牌進度:")
                                    .font(.subheadline)
                                    .foregroundColor(.starSilver)
                                Spacer()
                                Text("\(flippedCardsCount)/\(drawnCards.count)")
                                    .font(.subheadline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.mysticalPurple)
                            }
                            
                            MysticalProgressBar(
                                progress: Double(flippedCardsCount) / Double(drawnCards.count),
                                color: .mysticalPurple
                            )
                        }
                    }
                }
            }
            
            GeometryReader { geometry in
                ZStack {
                    ForEach(Array(drawnCards.enumerated()), id: \.element.id) { index, drawnCard in
                        DrawnCardView(
                            drawnCard: drawnCard,
                            onFlip: {
                                revealCard(at: index)
                            }
                        )
                        .position(
                            SpreadLayoutCalculator.calculateCardPositions(
                                for: selectedReadingType,
                                in: geometry
                            )[safe: index] ?? CGPoint(x: geometry.size.width/2, y: geometry.size.height/2)
                        )
                        .rotationEffect(.degrees(
                            SpreadLayoutCalculator.getCardRotations(for: selectedReadingType)[safe: index] ?? 0
                        ))
                        .scaleEffect(animateCards ? 1.0 : 0.8)
                        .opacity(animateCards ? 1.0 : 0.0)
                        .animation(
                            .mysticalSpring.delay(Double(index) * 0.3),
                            value: animateCards
                        )
                    }
                }
            }
            .frame(height: getSpreadHeight(for: selectedReadingType))
        }
        .id("cards-section")
        .padding(.horizontal, 20)
        .onAppear {
            animateCards = true
        }
    }
    
    private var analysisSection: some View {
        MysticalCardContainer {
            VStack(alignment: .leading, spacing: 20) {
                MysticalTitle("靈魂深入解讀")
                
                MysticalDivider()
                
                if !permissionManager.canUseAIAnalysis() {
                    InlineUpgradePrompt(
                        feature: .aiAnalysis,
                        onUpgrade: { showingUpgrade = true }
                    )
                } else {
                    if isAnalyzing {
                        VStack(spacing: 16) {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .gold))
                                .scaleEffect(1.5)
                            Text("正在連接宇宙智慧...")
                                .foregroundColor(.starSilver)
                                .font(.headline)
                        }
                        .padding(30)
                    } else if let error = analysisError {
                        errorView(error: error)
                    } else {
                        analysisResultView
                    }
                }
            }
        }
        .padding(.horizontal, 20)
    }
    
    private func errorView(error: String) -> some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle.fill")
                .foregroundColor(.red)
                .font(.title)
                .pulseEffect()
            
            Text("分析出現錯誤")
                .font(.headline)
                .foregroundColor(.red)
            
            Text(error)
                .font(.body)
                .foregroundColor(.starSilver)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 8)
            
            if error.contains("API Key") || error.contains("認證") || error.contains("401") {
                VStack(spacing: 12) {
                    MysticalDivider()
                    
                    HStack {
                        Image(systemName: "gear")
                            .foregroundColor(.gold)
                            .pulseEffect()
                        Text("配置說明")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundColor(.gold)
                    }
                    
                    Text("請在 AIService.swift 中配置正確的 OpenRouter API Key，或聯繫開發者獲取幫助。")
                        .font(.caption)
                        .foregroundColor(.starSilver.opacity(0.8))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 4)
                }
            }
        }
        .padding(20)
    }
    
    private var analysisResultView: some View {
        VStack(spacing: 20) {
            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.cardGradient)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.mysticalPurple.opacity(0.4), lineWidth: 1)
                    )
                    .frame(minHeight: 200)
                
                VStack(alignment: .leading, spacing: 0) {
                    if isDisplayingAnalysis {
                        HStack {
                            Image(systemName: "sparkles")
                                .foregroundColor(.gold)
                                .font(.caption)
                            Text("正在解讀中...")
                                .font(.caption)
                                .foregroundColor(.gold)
                                .opacity(0.8)
                        }
                        .padding(.bottom, 8)
                    }
                    
                    Text(displayedAnalysis)
                        .font(.body)
                        .foregroundColor(.starSilver)
                        .lineSpacing(6)
                        .animation(.easeInOut(duration: 0.3), value: displayedAnalysis)
                }
                .padding(24)
            }
            .shadow(color: .mysticalPurple.opacity(0.3), radius: 15, x: 0, y: 8)
            
            if !isDisplayingAnalysis {
                VStack(spacing: 12) {
                    MysticalShareButton(
                        action: {
                            Task {
                                await prepareAndShare()
                            }
                        },
                        isLoading: isAnalyzing
                    )
                    .padding(.bottom, 8)
                    
                    if !isDisplayingAnalysis && isReadingLocked {
                        EnhancedMysticalButton(
                            "重新占卜",
                            icon: "arrow.clockwise",
                            style: .purple
                        ) {
                            withAnimation(.mysticalSpring) {
                                resetReading()
                            }
                        }
                        .transition(.scale.combined(with: .opacity))
                        .animation(.mysticalSpring.delay(0.5), value: !isDisplayingAnalysis)
                        .padding(.top, 12)
                    }
                }
                .transition(.scale.combined(with: .opacity))
                .animation(.mysticalSpring.delay(0.3), value: !isDisplayingAnalysis)
            }
        }
    }
    
    // MARK: - Core Functions
    
    private func startReadingProcess(proxy: ScrollViewProxy) {
        guard !isReadingLocked else { return }
        
        isReadingLocked = true
        isDrawing = true
        
        // 確保 scrollProxy 已設置
        scrollProxy = proxy
        
        Task {
            await MainActor.run {
                currentPhase = .shuffling
                
                // 🎯 根據占卜類型選擇洗牌模式
                let shuffleMode = selectShuffleModeForReadingType(selectedReadingType)
                animationManager.currentShuffleMode = shuffleMode
            }
            
            // 🎯 使用統一的滾動管理器，自動滾動到洗牌區域
            if let scrollProxy = scrollProxy {
                await scrollCoordinator.scrollTo("shufflingSection", proxy: scrollProxy, delay: 0.1)
            }
            
            await withCheckedContinuation { (continuation: CheckedContinuation<Void, Never>) in
                let duration = animationManager.getDurationForMode(animationManager.currentShuffleMode)
                animationManager.startEnhancedShuffling(mode: animationManager.currentShuffleMode, duration: duration) {
                    continuation.resume()
                }
            }
            
            await MainActor.run {
                audioManager.playSound(.shuffle)
                currentPhase = .drawing
            }
            
            try? await Task.sleep(nanoseconds: 500_000_000)
            
            do {
                try await drawCards()
            } catch {
                await MainActor.run {
                    errorMessage = "抽牌過程中發生錯誤：\(error.localizedDescription)"
                    showError = true
                    isReadingLocked = false
                    isDrawing = false
                }
                return
            }
            
            await MainActor.run {
                currentPhase = .layout
                audioManager.playSound(.cardDraw)
            }
            
            // 短暫延遲讓牌陣佈局完成
            try? await Task.sleep(nanoseconds: 300_000_000)
            
            await MainActor.run {
                currentPhase = .revealing
                isDrawing = false
            }
            
            // 🎯 洗牌完成後，直接跳轉到塔羅牌區域，準備翻牌互動
            if let scrollProxy = scrollProxy {
                await scrollCoordinator.scrollTo("cardsSection", proxy: scrollProxy, delay: 0.1, duration: 1.0)
            }
        }
    }
    
    private func drawCards() async throws {
        let positions = getPositionsForSpread(selectedReadingType)
        
        await MainActor.run {
            drawnCards.removeAll()
        }
        
        // 獲取所有塔羅牌
        let allTarotCards = getAllTarotCards()
        
        for (index, position) in positions.enumerated() {
            let randomCard = allTarotCards.randomElement()!
            let isReversed = Bool.random()
            
            let drawnCard = DrawnCard(
                card: randomCard,
                isReversed: isReversed,
                position: position.name,
                positionIndex: index,
                spreadType: selectedReadingType,
                cgPosition: CGPoint(
                    x: position.relativePosition.x * 300,
                    y: position.relativePosition.y * 200
                ),
                rotation: Double.random(in: -5...5),
                scale: 1.0,
                isFlipped: false
            )
            
            await MainActor.run {
                drawnCards.append(drawnCard)
                audioManager.playSound(.cardDraw)
            }
            
            try? await Task.sleep(nanoseconds: 300_000_000)
        }
    }
    
    // MARK: - TarotSuit 枚舉定義
    enum TarotSuit: String, CaseIterable {
        case wands = "權杖"
        case cups = "聖杯"
        case swords = "寶劍"
        case pentacles = "錢幣"
        
        var displayName: String {
            return self.rawValue
        }
    }
    
    private func getAllTarotCards() -> [TarotCard] {
        // 使用現有的 TarotCardData 中的牌組
        return TarotCardData.allCards
    }
    
    private func getPositionsForSpread(_ spreadType: ReadingType) -> [SpreadPosition] {
        switch spreadType {
        case .single:
            return [
                SpreadPosition(index: 0, name: "當前指引", meaning: "當前最需要關注的訊息", importance: .primary, relativePosition: CGPoint(x: 0.5, y: 0.5))
            ]
        case .threeCard:
            return [
                SpreadPosition(index: 0, name: "過去", meaning: "影響當前情況的過去因素", importance: .secondary, relativePosition: CGPoint(x: 0.2, y: 0.5)),
                SpreadPosition(index: 1, name: "現在", meaning: "當前的狀況和挑戰", importance: .primary, relativePosition: CGPoint(x: 0.5, y: 0.5)),
                SpreadPosition(index: 2, name: "未來", meaning: "可能的發展方向", importance: .secondary, relativePosition: CGPoint(x: 0.8, y: 0.5))
            ]
        case .fourCard:
            return [
                SpreadPosition(index: 0, name: "現況", meaning: "當前的整體狀況", importance: .primary, relativePosition: CGPoint(x: 0.3, y: 0.3)),
                SpreadPosition(index: 1, name: "挑戰", meaning: "需要面對的困難", importance: .secondary, relativePosition: CGPoint(x: 0.7, y: 0.3)),
                SpreadPosition(index: 2, name: "行動", meaning: "建議採取的行動", importance: .secondary, relativePosition: CGPoint(x: 0.3, y: 0.7)),
                SpreadPosition(index: 3, name: "結果", meaning: "可能的結果", importance: .primary, relativePosition: CGPoint(x: 0.7, y: 0.7))
            ]
        case .choice:
            return [
                SpreadPosition(index: 0, name: "問題核心", meaning: "選擇的核心問題", importance: .primary, relativePosition: CGPoint(x: 0.5, y: 0.2)),
                SpreadPosition(index: 1, name: "選項A", meaning: "第一個選擇的結果", importance: .secondary, relativePosition: CGPoint(x: 0.2, y: 0.5)),
                SpreadPosition(index: 2, name: "選項B", meaning: "第二個選擇的結果", importance: .secondary, relativePosition: CGPoint(x: 0.8, y: 0.5)),
                SpreadPosition(index: 3, name: "隱藏因素", meaning: "影響決定的隱藏因素", importance: .supporting, relativePosition: CGPoint(x: 0.3, y: 0.8)),
                SpreadPosition(index: 4, name: "最佳路徑", meaning: "建議的最佳選擇", importance: .primary, relativePosition: CGPoint(x: 0.7, y: 0.8))
            ]
        case .diamond:
            return [
                SpreadPosition(index: 0, name: "核心", meaning: "問題的核心", importance: .primary, relativePosition: CGPoint(x: 0.5, y: 0.5)),
                SpreadPosition(index: 1, name: "過去影響", meaning: "過去的影響", importance: .secondary, relativePosition: CGPoint(x: 0.5, y: 0.2)),
                SpreadPosition(index: 2, name: "左側力量", meaning: "左側的影響力", importance: .secondary, relativePosition: CGPoint(x: 0.2, y: 0.5)),
                SpreadPosition(index: 3, name: "右側力量", meaning: "右側的影響力", importance: .secondary, relativePosition: CGPoint(x: 0.8, y: 0.5)),
                SpreadPosition(index: 4, name: "未來趨勢", meaning: "未來的發展趨勢", importance: .secondary, relativePosition: CGPoint(x: 0.5, y: 0.8))
            ]
        case .celticCross:
            return [
                SpreadPosition(index: 0, name: "當前狀況", meaning: "目前的情況", importance: .primary, relativePosition: CGPoint(x: 0.4, y: 0.5)),
                SpreadPosition(index: 1, name: "挑戰", meaning: "面臨的挑戰", importance: .secondary, relativePosition: CGPoint(x: 0.6, y: 0.5)),
                SpreadPosition(index: 2, name: "遠因", meaning: "問題的根源", importance: .supporting, relativePosition: CGPoint(x: 0.5, y: 0.3)),
                SpreadPosition(index: 3, name: "近因", meaning: "最近的影響", importance: .supporting, relativePosition: CGPoint(x: 0.5, y: 0.7)),
                SpreadPosition(index: 4, name: "可能結果", meaning: "可能的結果", importance: .secondary, relativePosition: CGPoint(x: 0.2, y: 0.5)),
                SpreadPosition(index: 5, name: "近期發展", meaning: "近期的發展", importance: .secondary, relativePosition: CGPoint(x: 0.8, y: 0.5)),
                SpreadPosition(index: 6, name: "內在狀態", meaning: "內在的狀態", importance: .supporting, relativePosition: CGPoint(x: 0.9, y: 0.8)),
                SpreadPosition(index: 7, name: "外在影響", meaning: "外在的影響", importance: .supporting, relativePosition: CGPoint(x: 0.9, y: 0.6)),
                SpreadPosition(index: 8, name: "希望恐懼", meaning: "希望與恐懼", importance: .supporting, relativePosition: CGPoint(x: 0.9, y: 0.4)),
                SpreadPosition(index: 9, name: "最終結果", meaning: "最終的結果", importance: .primary, relativePosition: CGPoint(x: 0.9, y: 0.2))
            ]
        }
    }
    
    private func revealCard(at index: Int) {
        guard index < drawnCards.count else { return }
        
        withAnimation(.easeInOut(duration: 0.8)) {
            drawnCards[index].isRevealed = true
        }
        
        audioManager.playSound(.cardFlip)
        audioManager.playFeedback(sound: .shuffle, haptic: .medium)
        
        flippedCardsCount += 1
        
        if flippedCardsCount >= drawnCards.count {
            allCardsFlipped = true
            
            // 延遲進入分析階段，確保視圖更新完成
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                enterAnalysisPhase()
                
                // 🎯 使用統一的滾動管理器，自動滾動到分析區域
                Task {
                    if let proxy = scrollProxy {
                        await scrollCoordinator.scrollTo("analysisSection", proxy: proxy, delay: 1.0, duration: 1.2, anchorPoint: .top)
                    }
                }
            }
        }
    }
    
    private func enterAnalysisPhase() {
        currentPhase = .analysis
        isAnalyzing = true
        
        audioManager.playFeedback(sound: .shuffle, haptic: .heavy)
        
        Task {
            await performAIAnalysis()
        }
    }
    
    private func performAIAnalysis() async {
        do {
            // 🔧 修復：直接使用 userSession.userProfile 獲取完整的個人資料
            let userProfile = userSession.userProfile
            
            // 調試日誌：確認用戶資料是否正確獲取
            if let profile = userProfile {
                print("✅ AI分析使用用戶個人資料:")
                print("   - 用戶ID: \(profile.id)")
                print("   - 姓名: \(profile.fullName ?? "未設置")")
                print("   - Email: \(profile.email ?? "未設置")")
                print("   - 生日: \(profile.birthDate?.description ?? "未設置")")
                print("   - 星座: \(profile.zodiacSign ?? "未設置")")
                print("   - 個人簡介: \(profile.bio ?? "未設置")")
                print("   - 偏好語言: \(profile.preferredLanguage)")
                print("   - 主題偏好: \(profile.themePreference)")
                print("   - 通知設置: \(profile.notificationEnabled)")
            } else {
                print("⚠️ AI分析未獲取到用戶個人資料，將使用匿名模式")
                print("   - userSession.userProfile 為 nil")
                print("   - userSession.currentUser: \(userSession.currentUser?.id.uuidString ?? "nil")")
            }
            
            // 調用真實的 AIService 進行分析
            let analysis = try await AIService.shared.analyzeTarotReading(
                question: question,
                cards: drawnCards,
                readingType: selectedReadingType.rawValue,
                divinationType: divinationType,
                userProfile: userProfile
            )
            
            await MainActor.run {
                aiAnalysis = analysis
                isAnalyzing = false
                showResult = true
                analysisError = nil
                
                print("✅ AI分析完成，結果長度: \(analysis.count) 字符")
                startDisplayingAnalysis()
            }
            
        } catch let error as AIServiceError {
            await MainActor.run {
                analysisError = error.errorDescription ?? "AI分析過程中發生未知錯誤"
                isAnalyzing = false
                print("❌ AI分析錯誤: \(error.errorDescription ?? "未知錯誤")")
            }
        } catch {
            await MainActor.run {
                analysisError = "AI分析過程中發生錯誤：\(error.localizedDescription)"
                isAnalyzing = false
                print("❌ AI分析錯誤: \(error.localizedDescription)")
            }
        }
    }
    
    private func buildAnalysisRequest() -> String {
        var request = "問題：\(question)\n"
        request += "占卜類型：\(selectedReadingType.displayName)\n"
        request += "抽取的卡牌：\n"
        
        for card in drawnCards {
            request += "- \(card.position)：\(card.card.name)"
            if card.isReversed {
                request += "（逆位）"
            }
            request += "\n"
        }
        
        return request
    }
    
    private func startDisplayingAnalysis() {
        // 🔄 重置顯示狀態
        displayedAnalysis = ""
        fullAnalysisText = aiAnalysis
        isDisplayingAnalysis = true
        
        // ✅ 使用簡單的淡入動畫顯示
        withAnimation(.easeInOut(duration: 0.8)) {
            displayedAnalysis = fullAnalysisText
            isDisplayingAnalysis = false
        }
        
        // 自動保存
        saveReadingAutomatically()
        
        print("✅ AI 分析結果已顯示")
    }
    

    

    

    

    

    
    private func saveReadingAutomatically() {
        // 確保有完整的占卜數據
        guard !drawnCards.isEmpty, !aiAnalysis.isEmpty, !question.isEmpty else {
            print("⚠️ 占卜數據不完整，跳過自動保存")
            return
        }
        
        Task {
            do {
                // 創建 TarotHistory 對象
                let history = TarotHistory(
                    id: Int64.random(in: 1...Int64.max), // 臨時 ID，實際會由數據庫生成
                    userId: userSession.currentUser?.id ?? UUID(),
                    drawType: selectedReadingType.rawValue,
                    cards: drawnCards.map { $0.card },
                    aiResult: aiAnalysis,
                    question: question,
                    isPremium: selectedReadingType.isPremium,
                    drawTime: Date(),
                    createdAt: Date()
                )
                
                // 只保存到雲端數據庫，不再同時保存到本地
                _ = try await databaseService.saveTarotHistory(history)
                
                // 🔧 修復：記錄占卜使用次數（僅針對免費用戶）
                await MainActor.run {
                    // 記錄占卜使用次數，確保免費用戶的每日限制正常工作
                    permissionManager.recordReading()
                    print("✅ 占卜記錄已自動保存到雲端，使用次數已記錄")
                    audioManager.playFeedback(sound: .success, haptic: .success)
                }
                
            } catch {
                print("❌ 雲端保存失敗: \(error)")
                await MainActor.run {
                    // 即使保存失敗，也要記錄使用次數，避免免費用戶繞過限制
                    permissionManager.recordReading()
                    print("⚠️ 雲端保存失敗，但使用次數已記錄")
                    audioManager.playFeedback(sound: .error, haptic: .error)
                    
                    // 可以考慮顯示錯誤提示給用戶
                    // 但不影響占卜體驗，用戶可以稍後在歷史頁面手動同步
                }
            }
        }
    }
    
    private func resetReading() {
        // 先清理資源
        cleanup()
        
        question = ""
        selectedReadingType = .single
        drawnCards.removeAll()
        aiAnalysis = ""
        displayedAnalysis = ""
        showResult = false
        isAnalyzing = false
        isDrawing = false
        isReadingLocked = false
        flippedCardsCount = 0
        allCardsFlipped = false
        currentPhase = .preparation
        analysisError = nil
        isDisplayingAnalysis = false
        
        audioManager.playFeedback(sound: .shuffle, haptic: .light)
    }
    
    // MARK: - Memory Management
    
    /// 清理記憶體資源，防止記憶體洩漏
    private func cleanup() {
        // 🚨 重要：保留AI解讀相關數據，保持用戶體驗
        // 保留 displayedAnalysis、fullAnalysisText 和 aiAnalysis
        // 這些數據對用戶很重要，不應該在App切換時丟失
        
        // 只清理非必要資源
        if currentPhase == .preparation {
            selectedCards.removeAll()
            revealedCards.removeAll()
        }
        
        // 清理動畫相關狀態
        animateCards = false
        showShimmer = false
        
        // 清理大型陣列（但保留分享相關數據）
        if !isReadingLocked && shareItems.isEmpty {
            shareItems.removeAll()
        }
        
        // 保留 spreadConfiguration，因為這是當前占卜的配置
        
        // 清理錯誤狀態
        analysisError = nil
        errorMessage = ""
    }
    
    // MARK: - Shuffle Mode Selection
    
    /// 根據占卜類型選擇合適的洗牌模式
    private func selectShuffleModeForReadingType(_ readingType: ReadingType) -> ShuffleMode {
        switch readingType {
        case .single:
            return .classic // 單張指引使用經典洗牌
        case .threeCard:
            return .mystical // 三張時光使用神秘洗牌
        case .fourCard:
            return .spiral // 四張全析使用螺旋洗牌
        case .choice:
            return .chaos // 二擇一陣使用混沌洗牌
        case .diamond:
            return .fanSpread // 鑽石牌陣使用扇形展開
        case .celticCross:
            return .mystical // 凱爾特十字使用神秘洗牌
        }
    }
    
    /// 處理記憶體警告
    private func handleMemoryWarning() {
        // 🚨 重要：保護AI解讀數據，避免用戶體驗受損
        // 保留 displayedAnalysis、fullAnalysisText 和 aiAnalysis
        
        // 清理分享相關資源（如果沒有在分享）
        if !showShareSheet {
            shareItems.removeAll()
        }
        
        // 清理動畫狀態（只在準備階段）
        if currentPhase == .preparation {
            animateCards = false
        }
        
        // 清理其他非關鍵資源（但保留重要的用戶狀態）
        if currentPhase == .preparation {
            // 只在準備階段才清理選擇狀態
            selectedCards.removeAll()
            revealedCards.removeAll()
        }
        
        // 強制垃圾回收（僅在記憶體警告時）
        DispatchQueue.global(qos: .utility).async {
            // 在背景執行緒中進行清理
        }
    }
    
    // 🔧 恢復AI解讀顯示的方法
    private func restoreAnalysisDisplay() {
        // 確保有AI解讀內容需要恢復
        guard !aiAnalysis.isEmpty else { return }
        
        // 如果displayedAnalysis為空但aiAnalysis有內容，說明需要恢復顯示
        if displayedAnalysis.isEmpty && !aiAnalysis.isEmpty {
            print("🔄 App回到前台，恢復AI解讀顯示")
            
            // 直接顯示完整的AI解讀內容
            displayedAnalysis = aiAnalysis
            
            // 確保分析結果區域可見
            showResult = true
            
            // 確保處於分析階段
            if currentPhase != .analysis {
                currentPhase = .analysis
            }
        }
    }
    
    private func loadTarotCards() {
        // 預載塔羅牌數據
    }
    
    private func prepareAndShare() async {
        // 在主線程顯示loading狀態
        await MainActor.run {
            isAnalyzing = true
        }
        
        // 在後台線程生成圖片
        let result = await Task.detached {
            // 創建圖片內容
            let imageContent = TarotImageGenerator.ImageContent(
                question: question,
                drawnCards: drawnCards,
                aiAnalysis: aiAnalysis,
                readingType: selectedReadingType,
                timestamp: Date()
            )
            
            // 生成圖片
            return await TarotImageGenerator.generateImage(content: imageContent)
        }.value
        
        // 回到主線程處理結果
        await MainActor.run {
            isAnalyzing = false
            
            guard let imageData = result else {
                errorMessage = "圖片生成失敗，請稍後再試"
                showError = true
                return
            }
            
            // 添加觸覺反饋
            let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
            impactFeedback.impactOccurred()
            
            shareItems = [imageData]
            showShareSheet = true
        }
    }
    

    
    private func getSpreadHeight(for spreadType: ReadingType) -> CGFloat {
        switch spreadType {
        case .single:
            return 350  // 單張牌較大，增加空間容納動畫效果
        case .threeCard:
            return 350  // 三張牌中等尺寸，增加空間
        case .fourCard:
            return 420  // 四張牌增加間距後需要更多空間
        case .choice:
            return 480  // 五張牌布局複雜，增加垂直空間
        case .diamond:
            return 600  // 鑽石牌陣大幅增加間距後需要更多顯示空間
        case .celticCross:
            return 650  // 十字牌陣需要足夠空間顯示所有卡牌
        }
    }
}

// MARK: - TarotCard Extension for Major Arcana Names

extension TarotCard {
    static let majorArcanaNames = [
        "愚者", "魔術師", "女祭司", "皇后", "皇帝", "教皇",
        "戀人", "戰車", "力量", "隱士", "命運之輪", "正義",
        "倒吊人", "死神", "節制", "惡魔", "高塔", "星星",
        "月亮", "太陽", "審判", "世界"
    ]
}

// MARK: - Supporting Views

struct CardBackView: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 12)
            .fill(
                LinearGradient(
                    gradient: Gradient(colors: [Color.purple.opacity(0.8), Color.indigo.opacity(0.8)]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .frame(width: 80, height: 120)
            .overlay(
                VStack {
                    Image(systemName: "sparkles")
                        .font(.title)
                        .foregroundColor(.white)
                    Text("✨")
                        .font(.title2)
                }
            )
            .shadow(color: .purple.opacity(0.3), radius: 5, x: 0, y: 3)
    }
}

struct DrawnCardView: View, Equatable {
    let drawnCard: TarotReadingView.DrawnCard
    let onFlip: () -> Void
    
    // 使用 Equatable 避免不必要的更新
    static func == (lhs: DrawnCardView, rhs: DrawnCardView) -> Bool {
        lhs.drawnCard.id == rhs.drawnCard.id &&
        lhs.drawnCard.isRevealed == rhs.drawnCard.isRevealed
    }
    @State private var isFlipped = false
    @State private var cardGlow = false
    @State private var hasFlipped = false
    
    // 皇室戰爭風格動畫狀態
    @State private var showGoldenBurst = false
    @State private var showParticles = false
    @State private var cardShake = false
    @State private var cardBounce = false
    @State private var glowPulse = false
    @State private var particlePositions: [CGPoint] = []
    @State private var particleOpacities: [Double] = []
    
    // 根據牌陣類型和屏幕尺寸動態計算卡片尺寸
    private var cardSize: CGSize {
        // 根據屏幕尺寸動態調整卡牌大小 - 使用現代方式獲取屏幕尺寸
        let screenBounds = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first?.screen.bounds ?? CGRect(x: 0, y: 0, width: 375, height: 667)
        
        let screenWidth = screenBounds.width
        let screenHeight = screenBounds.height
        let screenScale = min(screenWidth / 375.0, screenHeight / 667.0) // 基於 iPhone SE 尺寸
        let dynamicScale = max(0.7, min(1.3, screenScale)) // 限制縮放範圍
        
        let baseSize: CGSize
        switch drawnCard.spreadType {
        case .single:
            baseSize = CGSize(width: 160, height: 230)  // 單張牌較大
        case .threeCard:
            baseSize = CGSize(width: 140, height: 200)  // 三張牌中等
        case .fourCard:
            baseSize = CGSize(width: 120, height: 170)  // 四張牌稍小
        case .choice:
            baseSize = CGSize(width: 110, height: 160)  // 五張牌較小
        case .diamond:
            baseSize = CGSize(width: 110, height: 160)  // 鑽石牌陣較小
        case .celticCross:
            baseSize = CGSize(width: 75, height: 110)   // 十字牌陣縮小尺寸以確保所有牌都可見
        }
        
        return CGSize(
            width: baseSize.width * dynamicScale,
            height: baseSize.height * dynamicScale
        )
    }
    
    // 根據卡片大小調整星星和圖標尺寸
    private var starSize: CGFloat {
        cardSize.width > 140 ? 50 : (cardSize.width > 110 ? 40 : 30)
    }
    
    private var iconSize: Font {
        cardSize.width > 140 ? .title : (cardSize.width > 110 ? .title2 : .title3)
    }
    
    private var spacing: CGFloat {
        cardSize.width > 140 ? 16 : (cardSize.width > 110 ? 12 : 8)
    }
    
    // 初始化粒子位置
    private func initializeParticles() {
        // 減少粒子數量從 12 改為 8，提升性能
        particlePositions = (0..<8).map { _ in
            CGPoint(
                x: CGFloat.random(in: -cardSize.width/2...cardSize.width/2),
                y: CGFloat.random(in: -cardSize.height/2...cardSize.height/2)
            )
        }
        particleOpacities = Array(repeating: 1.0, count: 8)
    }
    
    // 觸發皇室戰爭風格翻牌動畫
    private func triggerRoyaleFlipAnimation() {
        // 播放音效
        AudioManager.shared.playCardFlip()
        
        // 金色光芒爆發
        withAnimation(.easeOut(duration: 0.6)) {
            showGoldenBurst = true
        }
        
        // 粒子特效
        withAnimation(.easeOut(duration: 1.2)) {
            showParticles = true
        }
        
        // 震動效果
        withAnimation(.easeInOut(duration: 0.1).repeatCount(3, autoreverses: true)) {
            cardShake = true
        }
        
        // 翻牌動畫
        withAnimation(.easeInOut(duration: 0.8)) {
            isFlipped = true
            hasFlipped = true
        }
        
        // 彈跳效果（翻牌完成後）
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            withAnimation(.spring(response: 0.6, dampingFraction: 0.6, blendDuration: 0.3)) {
                cardBounce = true
            }
            
            // 持續光暈脈衝
            withAnimation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true)) {
                glowPulse = true
            }
        }
        
        // 清理動畫狀態
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            showGoldenBurst = false
            showParticles = false
            cardShake = false
        }
    }
    
    var body: some View {
        VStack(spacing: spacing) {
            ZStack {
                // 金色光芒爆發效果
                if showGoldenBurst {
                    Circle()
                        .fill(
                            RadialGradient(
                                gradient: Gradient(colors: [
                                    Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.8),
                                    Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.4),
                                    Color.clear
                                ]),
                                center: .center,
                                startRadius: 0,
                                endRadius: cardSize.width * 1.5
                            )
                        )
                        .frame(width: cardSize.width * 3, height: cardSize.width * 3)
                        .scaleEffect(showGoldenBurst ? 1.0 : 0.1)
                        .opacity(showGoldenBurst ? 1.0 : 0.0)
                        .animation(.easeOut(duration: 0.6), value: showGoldenBurst)
                        .blur(radius: 10)
                }
                
                // 粒子特效
                if showParticles {
                    ForEach(0..<particlePositions.count, id: \.self) { index in
                        Circle()
                            .fill(Color(red: 1.0, green: 0.84, blue: 0.0))
                            .frame(width: CGFloat.random(in: 4...8), height: CGFloat.random(in: 4...8))
                            .position(
                                x: cardSize.width/2 + (particlePositions[safe: index]?.x ?? 0),
                                y: cardSize.height/2 + (particlePositions[safe: index]?.y ?? 0)
                            )
                            .opacity(showParticles ? 0.0 : 1.0)
                            .scaleEffect(showParticles ? 2.0 : 1.0)
                            .animation(
                                .easeOut(duration: 1.2).delay(Double(index) * 0.05),
                                value: showParticles
                            )
                    }
                    
                    // 星星粒子
                    ForEach(0..<6, id: \.self) { index in
                        Image(systemName: "sparkles")
                            .foregroundColor(Color(red: 1.0, green: 0.84, blue: 0.0))
                            .font(.system(size: CGFloat.random(in: 12...20)))
                            .position(
                                x: cardSize.width/2 + CGFloat.random(in: -cardSize.width...cardSize.width),
                                y: cardSize.height/2 + CGFloat.random(in: -cardSize.height...cardSize.height)
                            )
                            .opacity(showParticles ? 0.0 : 1.0)
                            .rotationEffect(.degrees(Double.random(in: 0...360)))
                            .animation(
                                .easeOut(duration: 1.5).delay(Double(index) * 0.1),
                                value: showParticles
                            )
                    }
                }
                RoundedRectangle(cornerRadius: 16)
                    .fill(
                        LinearGradient(
                            colors: [.mysticalPurple, .deepPurple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .overlay(
                        VStack(spacing: cardSize.width > 140 ? 12 : (cardSize.width > 110 ? 10 : 8)) {
                            StarShape(points: 8, innerRadius: starSize * 0.6, outerRadius: starSize)
                                .fill(Color(red: 1.0, green: 0.84, blue: 0.0))
                                .frame(width: starSize, height: starSize)
                                .rotationEffect(Angle.degrees(cardGlow ? 360 : 0))
                                .animation(Animation.linear(duration: 8).repeatForever(autoreverses: false), value: cardGlow)
                            
                            Text("✦")
                                .font(iconSize)
                                .foregroundColor(Color(red: 1.0, green: 0.84, blue: 0.0))
                                .scaleEffect(cardGlow ? 1.2 : 1.0)
                                .animation(.easeInOut(duration: 2).repeatForever(autoreverses: true), value: cardGlow)
                            
                            VStack(spacing: 4) {
                                Image(systemName: "hand.tap.fill")
                                    .font(cardSize.width > 110 ? .title3 : .caption)
                                    .foregroundColor(.starSilver)
                                    .modifier(PulseEffect())
                                
                                Text("點擊翻牌")
                                    .font(cardSize.width > 110 ? .caption : .caption2)
                                    .foregroundColor(.starSilver)
                                    .fontWeight(.medium)
                            }
                        }
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color(red: 1.0, green: 0.84, blue: 0.0), lineWidth: 2)
                    )
                    .opacity(isFlipped ? 0 : 1)
                    .mysticalGlow(color: Color.mysticalPurple, radius: 15)
                
                TarotCardImageView(
                    card: drawnCard.card,
                    isReversed: drawnCard.isReversed,
                    size: cardSize
                )
                .clipShape(RoundedRectangle(cornerRadius: 16))
                .rotation3DEffect(
                    .degrees(isFlipped ? 180 : 0),
                    axis: (x: 0, y: 1, z: 0)
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(
                            LinearGradient(
                                colors: drawnCard.isReversed ? [.red, .orange, .red] : [Color(red: 1.0, green: 0.84, blue: 0.0), .mysticalPurple, Color(red: 1.0, green: 0.84, blue: 0.0)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: drawnCard.isReversed ? 3 : 2
                        )
                )
                .opacity(isFlipped ? 1 : 0)
                .mysticalGlow(color: Color(red: 1.0, green: 0.84, blue: 0.0), radius: 20)
            }
            .frame(width: cardSize.width, height: cardSize.height)
            .rotation3DEffect(
                .degrees(isFlipped ? 180 : 0),
                axis: (x: 0, y: 1, z: 0)
            )
            .scaleEffect(cardBounce ? 1.1 : 1.0)
            .offset(
                x: cardShake ? CGFloat.random(in: -3...3) : 0,
                y: cardShake ? CGFloat.random(in: -3...3) : 0
            )
            .shadow(
                color: glowPulse ? Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.6) : .black.opacity(0.3),
                radius: glowPulse ? 25 : 15,
                x: 0,
                y: 8
            )
            .onTapGesture {
                guard !hasFlipped else { return }
                
                initializeParticles()
                triggerRoyaleFlipAnimation()
                
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) {
                    onFlip()
                }
            }
            .onAppear {
                cardGlow = true
                initializeParticles()
            }
            
            Text(drawnCard.position)
                .font(.headline)
                .fontWeight(.semibold)
                .foregroundColor(Color(red: 1.0, green: 0.84, blue: 0.0))
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(
                    Capsule()
                        .fill(Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.2))
                        .overlay(
                            Capsule()
                                .stroke(Color(red: 1.0, green: 0.84, blue: 0.0), lineWidth: 1)
                        )
                )
                .opacity(isFlipped ? 1 : 0)
                .scaleEffect(isFlipped ? 1.0 : 0.8)
                .animation(.spring(response: 0.6, dampingFraction: 0.8, blendDuration: 0.3).delay(0.8), value: isFlipped)
        }
    }
}

// MARK: - ReadingTypeCard

struct ReadingTypeCard: View {
    let type: TarotReadingView.ReadingType
    let isSelected: Bool
    let action: () -> Void
    
    @State private var isHovered = false
    @State private var animateGlow = false
    @StateObject private var performanceConfig = PerformanceConfig.shared
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                HStack(spacing: 12) {
                    Text(getIconForReadingType(type))
                        .font(.title2)
                        .foregroundColor(type.color)
                        .scaleEffect(animateGlow ? 1.1 : 1.0)
                        .animation(
                            performanceConfig.shouldUseReducedMotion ? 
                                .linear(duration: 1.0) : 
                                .easeInOut(duration: 2).repeatForever(autoreverses: true), 
                            value: animateGlow
                        )
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text(type.displayName)
                            .font(.headline)
                            .fontWeight(.semibold)
                            .foregroundColor(.starSilver)
                        
                        HStack(spacing: 4) {
                            ForEach(0..<type.cardCount, id: \.self) { _ in
                                Circle()
                                    .fill(type.color.opacity(0.6))
                                    .frame(width: 6, height: 6)
                            }
                        }
                    }
                    
                    Spacer()
                    
                    if type.isPremium {
                        HStack(spacing: 4) {
                            Image(systemName: "crown.fill")
                                .font(.caption2)
                                .foregroundColor(Color(red: 1.0, green: 0.84, blue: 0.0))
                            Text("高級")
                                .font(.caption2)
                                .fontWeight(.semibold)
                                .foregroundColor(Color(red: 1.0, green: 0.84, blue: 0.0))
                        }
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(
                            Capsule()
                                .fill(Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.2))
                                .overlay(
                                    Capsule()
                                        .stroke(Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.5), lineWidth: 1)
                                )
                        )
                    }
                }
                
                Text(type.description)
                    .font(.caption)
                    .foregroundColor(.starSilver.opacity(0.8))
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
                    .padding(.horizontal, 12)
            }
            .padding(.vertical, 12)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(
                        LinearGradient(
                            gradient: Gradient(colors: [
                                Color.mysticalPurple.opacity(0.15),
                                Color.cosmicBlack.opacity(0.25),
                                Color.mysticalBlue.opacity(0.1)
                            ]),
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                LinearGradient(
                                    gradient: Gradient(colors: [
                                        type.color.opacity(isSelected ? 0.8 : 0.3),
                                        Color.starSilver.opacity(0.2)
                                    ]),
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: isSelected ? 2 : 1
                            )
                    )
                    .shadow(
                        color: type.color.opacity(isSelected ? 0.4 : 0.2),
                        radius: isSelected ? 12 : 6,
                        x: 0,
                        y: isSelected ? 6 : 3
                    )
            )
        }
        .buttonStyle(PlainButtonStyle())
        .scaleEffect(isHovered ? 1.02 : 1.0)
        .animation(.mysticalSpring, value: isHovered)
        .animation(.mysticalSpring, value: isSelected)
        .onAppear {
            animateGlow = true
        }
    }
    
    private func getIconForReadingType(_ type: TarotReadingView.ReadingType) -> String {
        switch type {
        case .single: return "🌟"
        case .threeCard: return "🔮"
        case .fourCard: return "💎"
        case .choice: return "⚖️"
        case .diamond: return "💠"
        case .celticCross: return "✨"
        }
    }
}











// MARK: - Array Extension

extension Array {
    subscript(safe index: Index) -> Element? {
        return indices.contains(index) ? self[index] : nil
    }
}

// MARK: - Performance Optimization Extensions
extension TarotReadingView {
    
    /// 🔧 監控性能並動態調整
    private func monitorPerformanceAndAdjust() {
        performanceMonitor.startMonitoring()
        
        // 根據設備性能初始化動畫等級
        currentAnimationLevel = performanceConfig.enableComplexAnimations ? 3 : 1
        shouldReduceAnimations = !performanceConfig.enableComplexAnimations
    }
    
    /// 🔧 根據 FPS 動態調整動畫
    private func adjustAnimationsBasedOnFPS(_ fps: Double) {
        DispatchQueue.main.async {
            if fps < 30 && self.currentAnimationLevel > 1 {
                // FPS 過低，降低動畫等級
                self.currentAnimationLevel -= 1
                self.shouldReduceAnimations = true
                print("🔧 Performance: FPS低於30，降低動畫等級至 \(self.currentAnimationLevel)")
            } else if fps > 50 && self.currentAnimationLevel < 3 && self.performanceConfig.enableComplexAnimations {
                // FPS 良好，可以提升動畫等級
                self.currentAnimationLevel += 1
                self.shouldReduceAnimations = false
                print("🔧 Performance: FPS良好，提升動畫等級至 \(self.currentAnimationLevel)")
            }
        }
    }
    
    /// 🔧 低記憶體優化
    private func handleLowMemoryOptimization() {
        DispatchQueue.main.async {
            // 強制降低動畫等級
            self.currentAnimationLevel = 1
            self.shouldReduceAnimations = true
            
            // 清理不必要的動畫狀態
            self.animateCards = false
            self.showShimmer = false
            
            // 通知圖片快取管理器清理記憶體
            TarotImageCacheManager.shared.clearMemoryCache()
            
            print("🔧 Performance: 低記憶體警告，執行優化措施")
        }
    }
    
    /// 🔧 移除通知監聽器
    private func removeNotificationObservers() {
        NotificationCenter.default.removeObserver(
            self,
            name: UIApplication.didReceiveMemoryWarningNotification,
            object: nil
        )
        NotificationCenter.default.removeObserver(
            self,
            name: UIApplication.didEnterBackgroundNotification,
            object: nil
        )
        NotificationCenter.default.removeObserver(
            self,
            name: UIApplication.willEnterForegroundNotification,
            object: nil
        )
    }
    
    /// 🔧 優化的動畫配置
    private var optimizedAnimation: Animation {
        switch currentAnimationLevel {
        case 1:
            return .linear(duration: 0.3)
        case 2:
            return .easeInOut(duration: 0.5)
        default:
            return .mysticalSpring
        }
    }
    
    /// 🔧 優化的粒子數量
    private var optimizedParticleCount: Int {
        switch currentAnimationLevel {
        case 1: return 3
        case 2: return 6
        default: return performanceConfig.maxParticleCount
        }
    }
}

#Preview {
    TarotReadingView(divinationType: .generalReading)
        .modelContainer(for: Reading.self, inMemory: true)
        .environmentObject(PermissionManager())
        .environmentObject(UserSession())
        .environmentObject(DatabaseService())
}
