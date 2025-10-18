//
//  ContentView.swift
//  SoulCards
//
//  Created by Andy Leung on 2025/1/24.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @EnvironmentObject var userSession: UserSession
    @EnvironmentObject var permissionManager: PermissionManager
    @EnvironmentObject var preferencesManager: UserPreferencesManager
    @State private var selectedTab = 0
    @State private var isLoading = true
    @State private var showingError = false
    @State private var errorMessage = ""
    @State private var showingOnboarding = false
    
    #if DEBUG
    @State private var showDebugMenu = false
    @State private var showGoogleSignInDemo = false
    #endif
    
    var body: some View {
        Group {
            if isLoading {
                LoadingView()
            } else if !userSession.isAuthenticated && !userSession.isGuestMode {
                AuthenticationView()
            } else {
                MainTabView(selectedTab: $selectedTab)
                    .sheet(isPresented: $showingOnboarding) {
                        OnboardingView()
                    }
            }
        }
        .deepSpaceNebulaBackground()
        .onAppear {
            print("📱 ContentView onAppear - isLoading: \(isLoading), isAuthenticated: \(userSession.isAuthenticated), isGuestMode: \(userSession.isGuestMode)")
            setupTabBarAppearance()
            initializeApp()
        }
        .onChange(of: userSession.isAuthenticated) { _, newValue in
            print("📱 ContentView - isAuthenticated 變化: -> \(newValue)")
        }
        .onChange(of: userSession.isGuestMode) { _, newValue in
            print("📱 ContentView - isGuestMode 變化: -> \(newValue)")
        }
        .onChange(of: userSession.authenticationState) { _, newValue in
            print("📱 ContentView - authenticationState 變化: -> \(newValue)")
        }
        .onChange(of: isLoading) { _, newValue in
            print("📱 ContentView - isLoading 變化: -> \(newValue)")
        }
        .alert("錯誤", isPresented: $showingError) {
            Button("確定") { }
        } message: {
            Text(errorMessage)
        }
    }
    
    private func setupTabBarAppearance() {
        let appearance = UITabBarAppearance()
        appearance.configureWithTransparentBackground()
        
        // 設置背景為完全透明，讓 deepSpaceNebulaBackground 顯示
        appearance.backgroundColor = UIColor.clear
        appearance.backgroundEffect = nil  // 移除任何背景效果
        appearance.shadowColor = UIColor.clear  // 移除陰影
        
        // 設置選中狀態的金色
        appearance.stackedLayoutAppearance.selected.iconColor = UIColor(Color.gold)
        appearance.stackedLayoutAppearance.selected.titleTextAttributes = [
            .foregroundColor: UIColor(Color.gold),
            .font: UIFont.systemFont(ofSize: 12, weight: .semibold)
        ]
        
        // 設置未選中狀態的銀色
        appearance.stackedLayoutAppearance.normal.iconColor = UIColor(Color.starSilver)
        appearance.stackedLayoutAppearance.normal.titleTextAttributes = [
            .foregroundColor: UIColor(Color.starSilver),
            .font: UIFont.systemFont(ofSize: 12, weight: .medium)
        ]
        
        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
        
        // 確保 TabBar 完全透明
        UITabBar.appearance().isTranslucent = true
        UITabBar.appearance().backgroundColor = UIColor.clear
    }
    
    private func initializeApp() {
        Task {
            // 檢查認證狀態
            await userSession.checkAuthenticationStatus()
            
            // 檢查是否是首次使用
            if preferencesManager.isFirstLaunch {
                await MainActor.run {
                    showingOnboarding = true
                    preferencesManager.setFirstLaunchCompleted()
                }
            }
            
            // 初始化權限管理器
            await MainActor.run {
                // 權限管理器已在初始化時自動加載每日占卜次數
                isLoading = false
            }
        }
    }
}

// MARK: - Home View
struct HomeView: View {
    @EnvironmentObject var permissionManager: PermissionManager
    @StateObject private var dailyInspirationService = DailyInspirationService()
    @State private var showingReading = false
    @State private var selectedDivinationType: DivinationType = .loveReading
    @State private var animateSymbols = false
    @State private var animateWelcome = false
    @State private var animateCards = false
    @State private var showingUpgrade = false
    @State private var animateGlow = false
    @State private var inspirationOpacity: Double = 1.0
    
    #if DEBUG
    @State private var showDebugMenu = false
    @State private var showGoogleSignInDemo = false
    #endif
    

    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 32) {
                    // 歡迎區塊
                    VStack(spacing: 30) {
                        // 中心塔羅圖片
                        Image("tarot_main_image")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 150, height: 150)
                            .clipShape(Circle())
                            .background(
                                Circle()
                                    .fill(.ultraThinMaterial)
                                    .overlay(
                                        Circle()
                                            .fill(Color.white.opacity(0.1))
                                            .overlay(
                                                Circle()
                                                    .stroke(Color.white.opacity(0.3), lineWidth: 1)
                                            )
                                    )
                                    .shadow(color: .black.opacity(0.2), radius: 10, x: 0, y: 5)
                            )
                            .shadow(color: .mysticalPurple.opacity(0.6), radius: 25, x: 0, y: 0)
                            .glowEffect(color: .mysticalPurple, radius: 20)
                        .padding(.top, 20)
                        
                        VStack(spacing: 20) {
                            Text("SoulCards")
                                .font(.system(size: 42, weight: .bold, design: .serif))
                                .foregroundStyle(
                                    LinearGradient(
                                        gradient: Gradient(colors: [.gold, .mysticalPurple, .gold]),
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                #if DEBUG
                                .onLongPressGesture(minimumDuration: 3.0) {
                                    showDebugMenu = true
                                }
                                #endif
                            
                            Text("探索你的內心世界，發現生命的奧秘")
                                .font(.title2)
                                .fontWeight(.medium)
                                .foregroundStyle(
                                    LinearGradient(
                                        gradient: Gradient(colors: [.starSilver, .mysticalBlue.opacity(0.8)]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .multilineTextAlignment(.center)
                                .opacity(0.95)
                                .shadow(color: .mysticalBlue.opacity(0.3), radius: 5, x: 0, y: 2)
                            
                            // 神秘裝飾線
                            HStack(spacing: 20) {
                                Rectangle()
                                    .fill(
                                        LinearGradient(
                                            gradient: Gradient(colors: [.clear, .gold.opacity(0.6), .clear]),
                                            startPoint: .leading,
                                            endPoint: .trailing
                                        )
                                    )
                                    .frame(height: 1)
                                
                                Image(systemName: "sparkles")
                                    .font(.caption)
                                    .foregroundColor(.gold)
                                    .scaleEffect(animateWelcome ? 1.2 : 1.0)
                                    .animation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true), value: animateWelcome)
                                
                                Rectangle()
                                    .fill(
                                        LinearGradient(
                                            gradient: Gradient(colors: [.clear, .gold.opacity(0.6), .clear]),
                                            startPoint: .leading,
                                            endPoint: .trailing
                                        )
                                    )
                                    .frame(height: 1)
                            }
                            .padding(.horizontal, 40)
                            .padding(.top, 8)
                        }
                    }
                    
                    // 每日占卜次數顯示
                    if permissionManager.userPermission == .free {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "star.fill")
                                    .foregroundColor(.gold)
                                    .font(.title3)
                                Text("每日占卜次數")
                                    .font(.title3)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.gold)
                                Spacer()
                                Text("\(permissionManager.dailyReadingsUsed)/\(permissionManager.dailyReadingLimit)")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(permissionManager.canUseDailyReading() ? .green : .red)
                            }
                            
                            ProgressView(value: Double(permissionManager.dailyReadingsUsed), total: Double(permissionManager.dailyReadingLimit))
                                .progressViewStyle(LinearProgressViewStyle(tint: .gold))
                                .scaleEffect(y: 2)
                        }
                        .padding(16)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(Color.cardGradient)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(Color.gold.opacity(0.3), lineWidth: 1)
                                )
                        )
                        .padding(.horizontal, 20)
                    }
                    
                    // 每日靈感卡片
                    VStack(alignment: .leading, spacing: 16) {
                        HStack {
                            Image(systemName: "sun.max.fill")
                                .foregroundColor(.gold)
                                .font(.title2)
                                .pulseEffect()
                                .rotationEffect(.degrees(animateGlow ? 5 : -5))
                                .animation(.easeInOut(duration: 3.0).repeatForever(autoreverses: true), value: animateGlow)
                            Text("今日靈感")
                                .font(.title2)
                                .fontWeight(.semibold)
                                .foregroundColor(.gold)
                            
                            Spacer()
                            
                            // 添加刷新提示圖標
                            Image(systemName: "arrow.clockwise")
                                .foregroundColor(.starSilver.opacity(0.6))
                                .font(.caption)
                                .opacity(0.7)
                                .scaleEffect(0.8)
                        }
                        
                        Text(dailyInspirationService.currentInspiration)
                            .font(.body)
                            .foregroundColor(.starSilver)
                            .lineSpacing(4)
                            .padding(20)
                            .background(
                                ZStack {
                                    // 主背景
                                    RoundedRectangle(cornerRadius: 16)
                                        .fill(Color.cardGradient)
                                    
                                    // 動態光暈效果
                                    RoundedRectangle(cornerRadius: 16)
                                        .fill(
                                            LinearGradient(
                                                gradient: Gradient(colors: [
                                                    Color.gold.opacity(0.1),
                                                    Color.mysticalPurple.opacity(0.05),
                                                    Color.clear
                                                ]),
                                                startPoint: .topLeading,
                                                endPoint: .bottomTrailing
                                            )
                                        )
                                        .scaleEffect(animateGlow ? 1.02 : 0.98)
                                        .opacity(animateGlow ? 0.8 : 0.4)
                                        .animation(.easeInOut(duration: 4.0).repeatForever(autoreverses: true), value: animateGlow)
                                    
                                    // 邊框
                                    RoundedRectangle(cornerRadius: 16)
                                        .stroke(
                                            LinearGradient(
                                                gradient: Gradient(colors: [
                                                    Color.gold.opacity(0.5),
                                                    Color.mysticalPurple.opacity(0.3),
                                                    Color.gold.opacity(0.5)
                                                ]),
                                                startPoint: .topLeading,
                                                endPoint: .bottomTrailing
                                            ),
                                            lineWidth: 1
                                        )
                                }
                            )
                            .shadow(color: .mysticalPurple.opacity(0.3), radius: 15, x: 0, y: 8)
                            .shadow(color: .gold.opacity(0.2), radius: 25, x: 0, y: 0)
                            .opacity(inspirationOpacity)
                            .animation(.easeInOut(duration: 0.8), value: inspirationOpacity)
                            .onTapGesture {
                                // 添加點擊刷新功能
                                withAnimation(.easeInOut(duration: 0.4)) {
                                    inspirationOpacity = 0.3
                                }
                                
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) {
                                    dailyInspirationService.updateInspiration()
                                    withAnimation(.easeInOut(duration: 0.4)) {
                                        inspirationOpacity = 1.0
                                    }
                                }
                            }
                    }
                    .padding(.horizontal, 20)
                    
                    // 快速占卜按鈕
                    PermissionGate(feature: .basicReading) {
                        MysticalButton(
                            "開始神秘占卜",
                            icon: "sparkles",
                            style: .gold
                        ) {
                            if permissionManager.canUseDailyReading() {
                                showingReading = true
                            } else {
                                showingUpgrade = true
                            }
                        }
                        .floatingEffect()
                    }
                    
                    // 占卜類型選擇
                    VStack(spacing: 25) {
                        VStack(spacing: 12) {
                            Text("選擇你的占卜方式")
                                .font(.system(size: 28, weight: .semibold, design: .serif))
                                .foregroundStyle(
                                    LinearGradient(
                                        gradient: Gradient(colors: [.starSilver, .mysticalBlue]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .shadow(color: .mysticalBlue.opacity(0.3), radius: 5, x: 0, y: 2)
                            
                            Text("每一種方式都將為你揭示不同的人生面向")
                                .font(.subheadline)
                                .foregroundColor(.starSilver.opacity(0.8))
                                .multilineTextAlignment(.center)
                        }
                        
                        // 神秘分隔線與裝飾
                        VStack(spacing: 16) {
                            HStack {
                                Rectangle()
                                    .fill(
                                        LinearGradient(
                                            gradient: Gradient(colors: [.clear, .starSilver.opacity(0.5), .clear]),
                                            startPoint: .leading,
                                            endPoint: .trailing
                                        )
                                    )
                                    .frame(height: 1)
                                
                                HStack(spacing: 12) {
                                    Image(systemName: "moon.fill")
                                        .foregroundColor(.starSilver.opacity(0.7))
                                        .font(.caption)
                                    
                                    Image(systemName: "sparkles")
                                        .foregroundColor(.gold.opacity(0.8))
                                        .font(.caption)
                                    
                                    Image(systemName: "sun.max.fill")
                                        .foregroundColor(.starSilver.opacity(0.7))
                                        .font(.caption)
                                }
                                
                                Rectangle()
                                    .fill(
                                        LinearGradient(
                                            gradient: Gradient(colors: [.clear, .starSilver.opacity(0.5), .clear]),
                                            startPoint: .leading,
                                            endPoint: .trailing
                                        )
                                    )
                                    .frame(height: 1)
                            }
                            
                            // 神秘符號裝飾
                            HStack(spacing: 30) {
                                ForEach(Array(["◊", "✦", "◊", "✧", "◊"].enumerated()), id: \.offset) { index, symbol in
                                    Text(symbol)
                                        .font(.system(size: 14, weight: .ultraLight))
                                        .foregroundStyle(
                                            LinearGradient(
                                                gradient: Gradient(colors: [
                                                    .gold.opacity(0.7),
                                                    .mysticalPurple.opacity(0.5),
                                                    .starSilver.opacity(0.6)
                                                ]),
                                                startPoint: .topLeading,
                                                endPoint: .bottomTrailing
                                            )
                                        )
                                        .scaleEffect(animateCards ? 1.2 : 0.8)
                                        .opacity(animateCards ? 0.8 : 0.4)
                                        .rotationEffect(.degrees(animateCards ? Double.random(in: -10...10) : 0))
                                        .animation(
                                            .easeInOut(duration: 3.0)
                                            .repeatForever(autoreverses: true)
                                            .delay(Double(index) * 0.3),
                                            value: animateCards
                                        )
                                }
                            }
                        }
                        .padding(.horizontal, 40)
                        .padding(.vertical, 20)
                        
                        // 占卜類型網格容器
                        ZStack {
                            // 神秘邊框裝飾
                            RoundedRectangle(cornerRadius: 25)
                                .stroke(
                                    LinearGradient(
                                        gradient: Gradient(colors: [
                                            .gold.opacity(0.3),
                                            .mysticalPurple.opacity(0.2),
                                            .starSilver.opacity(0.1),
                                            .gold.opacity(0.3)
                                        ]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    ),
                                    lineWidth: 1
                                )
                                .scaleEffect(animateCards ? 1.02 : 0.98)
                                .opacity(animateCards ? 0.6 : 0.3)
                                .animation(
                                    .easeInOut(duration: 4.0)
                                    .repeatForever(autoreverses: true),
                                    value: animateCards
                                )
                            
                            // 角落神秘符號
                            VStack {
                                HStack {
                                    Text("◈")
                                        .font(.system(size: 16, weight: .ultraLight))
                                        .foregroundColor(.gold.opacity(0.6))
                                        .rotationEffect(.degrees(animateCards ? 45 : 0))
                                        .animation(
                                            .easeInOut(duration: 6.0)
                                            .repeatForever(autoreverses: true),
                                            value: animateCards
                                        )
                                    
                                    Spacer()
                                    
                                    Text("◈")
                                        .font(.system(size: 16, weight: .ultraLight))
                                        .foregroundColor(.mysticalPurple.opacity(0.6))
                                        .rotationEffect(.degrees(animateCards ? -45 : 0))
                                        .animation(
                                            .easeInOut(duration: 6.0)
                                            .repeatForever(autoreverses: true)
                                            .delay(1.0),
                                            value: animateCards
                                        )
                                }
                                .padding(.horizontal, 10)
                                .padding(.top, 10)
                                
                                Spacer()
                                
                                HStack {
                                    Text("◈")
                                        .font(.system(size: 16, weight: .ultraLight))
                                        .foregroundColor(.starSilver.opacity(0.6))
                                        .rotationEffect(.degrees(animateCards ? -45 : 0))
                                        .animation(
                                            .easeInOut(duration: 6.0)
                                            .repeatForever(autoreverses: true)
                                            .delay(2.0),
                                            value: animateCards
                                        )
                                    
                                    Spacer()
                                    
                                    Text("◈")
                                        .font(.system(size: 16, weight: .ultraLight))
                                        .foregroundColor(.gold.opacity(0.6))
                                        .rotationEffect(.degrees(animateCards ? 45 : 0))
                                        .animation(
                                            .easeInOut(duration: 6.0)
                                            .repeatForever(autoreverses: true)
                                            .delay(3.0),
                                            value: animateCards
                                        )
                                }
                                .padding(.horizontal, 10)
                                .padding(.bottom, 10)
                            }
                            
                            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 16), count: 2), spacing: 24) {
                                ForEach(Array(DivinationType.allCases.enumerated()), id: \.element) { index, type in
                                    PermissionGate(feature: .basicReading) {
                                        DivinationTypeCard(
                                            type: type,
                                            isSelected: selectedDivinationType == type
                                        ) {
                                            selectedDivinationType = type
                                            if permissionManager.canUseDailyReading() {
                                                showingReading = true
                                            } else {
                                                showingUpgrade = true
                                            }
                                        }
                                        .scaleEffect(animateCards ? 1.0 : 0.8)
                                        .opacity(animateCards ? 1.0 : 0.0)
                                        .animation(
                                            .spring(response: 0.8, dampingFraction: 0.8, blendDuration: 0)
                                            .delay(Double(index) * 0.1),
                                            value: animateCards
                                        )
                                    }
                                }
                            }
                            .padding(25)
                        }
                        .padding(.horizontal, 20)
                    }
                    
                    Spacer(minLength: 100)
                }
                .padding(.horizontal, 20)
            }
            .deepSpaceNebulaBackground()
            .navigationTitle("")
            .navigationBarHidden(true)
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .sheet(isPresented: $showingReading) {
            TarotReadingView(divinationType: selectedDivinationType)
        }
        .sheet(isPresented: $showingUpgrade) {
            AppleIAPSubscriptionView()
        }
        #if DEBUG
        .sheet(isPresented: $showGoogleSignInDemo) {
            GoogleSignInDemoApp()
        }
        .sheet(isPresented: $showDebugMenu) {
            VStack(spacing: 30) {
                Text("🔧 調試菜單")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.gold)
                
                VStack(spacing: 16) {
                    Text("當前權限狀態")
                        .font(.headline)
                        .foregroundColor(.starSilver)
                    
                    Text(permissionManager.getDebugPermissionInfo())
                        .font(.caption)
                        .foregroundColor(.starSilver.opacity(0.7))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                
                VStack(spacing: 16) {
                    Button("設置為 ADMIN 權限") {
                        permissionManager.setAdminPermission()
                        showDebugMenu = false
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.gold)
                    
                    Button("設置為高級用戶") {
                        permissionManager.setPremiumUser()
                        showDebugMenu = false
                    }
                    .buttonStyle(.bordered)
                    .tint(.mysticalBlue)
                    
                    Button("重置為免費用戶") {
                        permissionManager.resetToFreeUser()
                        showDebugMenu = false
                    }
                    .buttonStyle(.bordered)
                    .tint(.red)
                    
                    Button("🔐 Google Sign-In 測試") {
                        showGoogleSignInDemo = true
                        showDebugMenu = false
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.mysticalBlue)
                    
                    Button("關閉") {
                        showDebugMenu = false
                    }
                    .buttonStyle(.bordered)
                    .tint(.starSilver)
                }
            }
            .padding(30)
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [Color.black, Color.purple.opacity(0.3), Color.black]),
                    startPoint: .top,
                    endPoint: .bottom
                )
            )
        }
        #endif
        .onAppear {
            animateSymbols = true
            animateWelcome = true
            animateGlow = true
            
            // 初始化每日靈感
            dailyInspirationService.updateInspiration()
            
            // 延遲動畫卡片
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                animateCards = true
            }
        }
    }
}

struct DivinationTypeCard: View {
    let type: DivinationType
    let isSelected: Bool
    let action: () -> Void
    @State private var isHovered = false
    @State private var animateGlow = false
    @State private var showDetails = false
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                // 神秘圖標區域
                ZStack {
                    // 外圈光環
                    Circle()
                        .stroke(type.color.opacity(0.3), lineWidth: 2)
                        .frame(width: 80, height: 80)
                        .scaleEffect(animateGlow ? 1.1 : 1.0)
                        .opacity(animateGlow ? 0.5 : 1.0)
                        .animation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true), value: animateGlow)
                    
                    // 內圈背景
                    Circle()
                        .fill(
                            RadialGradient(
                                gradient: Gradient(colors: [
                                    type.color.opacity(0.3),
                                    type.color.opacity(0.1),
                                    Color.clear
                                ]),
                                center: .center,
                                startRadius: 10,
                                endRadius: 35
                            )
                        )
                        .frame(width: 70, height: 70)
                        .glowEffect(color: type.color, radius: isSelected ? 20 : 10)
                    
                    // 圖標
                    Image(systemName: type.icon)
                        .font(.title)
                        .foregroundColor(type.color)
                        .scaleEffect(isSelected ? 1.3 : 1.1)
                        .rotationEffect(.degrees(isHovered ? 5 : 0))
                        .animation(.mysticalSpring, value: isSelected)
                        .animation(.easeInOut(duration: 0.3), value: isHovered)
                        .shadow(color: type.color.opacity(0.5), radius: 8, x: 0, y: 0)
                }
                
                Spacer(minLength: 8)
                
                VStack(spacing: 6) {
                    // 標題
                    Text(type.displayName)
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundStyle(
                            LinearGradient(
                                gradient: Gradient(colors: [type.color, .starSilver]),
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .multilineTextAlignment(.center)
                        .lineLimit(2)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    // 描述文字
                    Text(type.description)
                        .font(.caption)
                        .foregroundColor(.starSilver.opacity(0.8))
                        .multilineTextAlignment(.center)
                        .lineLimit(2)
                        .padding(.horizontal, 8)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    Spacer(minLength: 4)
                    
                    // 卡牌數量指示
                    HStack(spacing: 4) {
                        ForEach(0..<type.cardCount, id: \.self) { _ in
                            RoundedRectangle(cornerRadius: 2)
                                .fill(type.color.opacity(0.6))
                                .frame(width: 8, height: 12)
                        }
                    }
                    .padding(.top, 2)
                    
                    // 高級標記
                    if type.isPremium {
                        HStack(spacing: 4) {
                            Image(systemName: "crown.fill")
                                .font(.caption2)
                                .foregroundColor(.gold)
                            Text("高級")
                                .font(.caption2)
                                .fontWeight(.semibold)
                                .foregroundColor(.gold)
                        }
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(
                            Capsule()
                                .fill(Color.gold.opacity(0.2))
                                .overlay(
                                    Capsule()
                                        .stroke(Color.gold.opacity(0.5), lineWidth: 1)
                                )
                        )
                    }
                }
                
                Spacer(minLength: 8)
            }
            .padding(16)
            .frame(maxWidth: .infinity, maxHeight: 220)
            .background(
                RoundedRectangle(cornerRadius: 20)
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
                        RoundedRectangle(cornerRadius: 20)
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
                        radius: isSelected ? 15 : 8,
                        x: 0,
                        y: isSelected ? 8 : 4
                    )
            )
        }
        .scaleEffect(isHovered ? 1.05 : 1.0)
        .rotationEffect(.degrees(isHovered ? 1 : 0))
        .animation(.mysticalSpring, value: isHovered)
        .animation(.mysticalSpring, value: isSelected)
        .onHover { hovering in
            isHovered = hovering
        }
        .onAppear {
            animateGlow = true
        }
    }
}



// MARK: - Reading View
struct ReadingView: View {
    var body: some View {
        TarotReadingView(divinationType: .generalReading)
    }
}

// MARK: - Main Tab View

struct MainTabView: View {
    @Binding var selectedTab: Int
    @EnvironmentObject var permissionManager: PermissionManager
    @StateObject private var guideService = TarotGuideService()
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("首頁")
                }
                .tag(0)
            
            PermissionGate(feature: .basicReading) {
                        TarotReadingView(divinationType: .generalReading)
            }
                .tabItem {
                    Image(systemName: "sparkles")
                    Text("占卜")
                }
                .tag(1)
            
            TarotGuideMainView(guideService: guideService)
                .tabItem {
                    Image(systemName: "book.fill")
                    Text("塔羅指南")
                }
                .tag(2)
            
            PermissionGate(feature: .limitedHistory) {
                TarotHistoryView()
            }
            .tabItem {
                Image(systemName: "clock.fill")
                Text("歷史")
            }
            .tag(3)

            AppleIAPSubscriptionView()
                .tabItem {
                    Image(systemName: "crown.fill")
                    Text("訂閱")
                }
                .tag(4)
            
            TarotProfileView()
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("個人")
                }
                .tag(5)
        }
        .accentColor(Color.gold)
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Reading.self, inMemory: true)
        .environmentObject(UserSession())
        .environmentObject(PermissionManager())
        .environmentObject(UserPreferencesManager())
}
