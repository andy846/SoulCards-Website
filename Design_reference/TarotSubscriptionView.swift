//
//  TarotSubscriptionView.swift
//  SoulCards
//
//  Created by SOLO Coding on 2024/01/24.
//

import SwiftUI
// import Stripe // Replaced with mock implementation

struct TarotSubscriptionView: View {
    @EnvironmentObject var subscriptionManager: SubscriptionManager
    @EnvironmentObject var paymentManager: PaymentManager
    @EnvironmentObject private var userSession: UserSession
    @State private var selectedPlan: SubscriptionPlan?
    @State private var showingPurchaseSheet = false
    @State private var animateCards = false
    @State private var showFeatures = false
    @State private var showingManageSubscription = false
    @State private var showingCancelConfirmation = false
    @State private var isLoading = false
    @State private var showingError = false
    @State private var errorMessage: String?
    @State private var showingSuccess = false
    @State private var successMessage: String?
    
    // 背景漸變
    private var backgroundGradient: some View {
        LinearGradient(
            gradient: Gradient(colors: [
                Color(red: 0.2, green: 0.1, blue: 0.4),     // 深紫色
                Color(red: 0.1, green: 0.05, blue: 0.3),    // 深藍紫色
                Color(red: 0.05, green: 0.02, blue: 0.15)   // 深黑色
            ]),
            startPoint: .top,
            endPoint: .bottom
        )
        .ignoresSafeArea()
    }
    
    var body: some View {
        ZStack {
            // 確保背景在最底層
            backgroundGradient
            
            ScrollView {
                VStack(spacing: 32) {
                    // 當前訂閱狀態或標題區域
                    if subscriptionManager.isPremiumUser {
                        currentSubscriptionHeader
                    } else {
                        upgradeHeader
                    }
                    
                    // 如果是高級用戶，顯示管理選項
                    if subscriptionManager.isPremiumUser {
                        subscriptionManagementSection
                    } else {
                        // 免費用戶顯示升級選項
                        freeUserStatusSection
                        featuresSection
                        pricingPlansSection
                        subscribeButton
                    }
                    
                    Spacer(minLength: 50)
                }
                .padding(.horizontal, 20)
            }
            .navigationTitle("")
            .navigationBarHidden(true)
        }
        .onAppear {
            animateCards = true
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                showFeatures = true
            }
            // 初始化選擇第一個方案
            if selectedPlan == nil {
                selectedPlan = subscriptionManager.subscriptionPlans.first
            }
        }
        .sheet(isPresented: $showingPurchaseSheet) {
            if let plan = selectedPlan {
                PurchaseConfirmationView(selectedPlan: plan)
            }
        }
        .sheet(isPresented: $showingManageSubscription) {
            SubscriptionManagementView()
        }
        .alert("取消訂閱", isPresented: $showingCancelConfirmation) {
            Button("確認取消", role: .destructive) {
                Task {
                    await handleCancelSubscription()
                }
            }
            Button("保留訂閱", role: .cancel) { }
        } message: {
            Text("確定要取消訂閱嗎？您將失去所有高級功能的訪問權限。")
        }
        .alert("錯誤", isPresented: $showingError) {
            Button("確定", role: .cancel) {
                errorMessage = nil
            }
        } message: {
            if let errorMessage = errorMessage {
                Text(errorMessage)
            }
        }
        .alert("成功", isPresented: $showingSuccess) {
            Button("確定", role: .cancel) { }
        } message: {
            Text(successMessage ?? "操作成功")
        }
        .onAppear {
            loadSubscriptionData()
        }
        .refreshable {
            await refreshSubscriptionData()
        }
    }
    
    // MARK: - 當前訂閱狀態標題
    private var currentSubscriptionHeader: some View {
        VStack(spacing: 20) {
            ZStack {
                Circle()
                    .fill(Color.goldGradient)
                    .frame(width: 120, height: 120)
                    .glowEffect(color: .gold, radius: 30)
                
                Image(systemName: "crown.fill")
                    .font(.system(size: 50))
                    .foregroundColor(.white)
                    .pulseEffect()
            }
            .scaleEffect(animateCards ? 1.0 : 0.8)
            .animation(.mysticalSpring.delay(0.2), value: animateCards)
            
            VStack(spacing: 12) {
                Text("Premium 會員")
                    .font(.system(size: 32, weight: .bold, design: .serif))
                    .foregroundStyle(Color.goldGradient)
                    .scaleEffect(animateCards ? 1.0 : 0.9)
                    .animation(.mysticalSpring.delay(0.4), value: animateCards)
                
                Text("您正在享受無限制的神秘體驗")
                    .font(.headline)
                    .foregroundColor(.starSilver.opacity(0.9))
                    .multilineTextAlignment(.center)
                    .opacity(animateCards ? 1.0 : 0.0)
                    .animation(.mysticalSpring.delay(0.6), value: animateCards)
                
                if let subscription = subscriptionManager.currentSubscription,
                   let endDate = subscription.currentPeriodEnd {
                    Text("有效期至：\(endDate.formatted(date: .abbreviated, time: .omitted))")
                        .font(.subheadline)
                        .foregroundColor(.gold)
                        .opacity(animateCards ? 1.0 : 0.0)
                        .animation(.mysticalSpring.delay(0.8), value: animateCards)
                }
            }
            
            HStack(spacing: 16) {
                ForEach(0..<5) { index in
                    StarShape(points: 5, innerRadius: 4, outerRadius: 8)
                        .fill(Color.gold)
                        .frame(width: 16, height: 16)
                        .scaleEffect(animateCards ? 1.0 : 0.0)
                        .animation(
                            .mysticalSpring.delay(0.8 + Double(index) * 0.1),
                            value: animateCards
                        )
                }
            }
        }
        .padding(.top, 20)
    }
    
    // MARK: - 升級標題
    private var upgradeHeader: some View {
        VStack(spacing: 20) {
            ZStack {
                Circle()
                    .fill(Color.goldGradient)
                    .frame(width: 120, height: 120)
                    .glowEffect(color: .gold, radius: 30)
                
                Image(systemName: "crown.fill")
                    .font(.system(size: 50))
                    .foregroundColor(.white)
                    .pulseEffect()
            }
            .scaleEffect(animateCards ? 1.0 : 0.8)
            .animation(.mysticalSpring.delay(0.2), value: animateCards)
            
            VStack(spacing: 12) {
                Text("解鎖神秘力量")
                    .font(.system(size: 32, weight: .bold, design: .serif))
                    .foregroundStyle(Color.goldGradient)
                    .scaleEffect(animateCards ? 1.0 : 0.9)
                    .animation(.mysticalSpring.delay(0.4), value: animateCards)
                
                Text("升級會員，開啟無限制的塔羅占卜體驗")
                    .font(.headline)
                    .foregroundColor(.starSilver.opacity(0.9))
                    .multilineTextAlignment(.center)
                    .opacity(animateCards ? 1.0 : 0.0)
                    .animation(.mysticalSpring.delay(0.6), value: animateCards)
            }
            
            HStack(spacing: 16) {
                ForEach(0..<5) { index in
                    StarShape(points: 5, innerRadius: 4, outerRadius: 8)
                        .fill(Color.gold)
                        .frame(width: 16, height: 16)
                        .scaleEffect(animateCards ? 1.0 : 0.0)
                        .animation(
                            .mysticalSpring.delay(0.8 + Double(index) * 0.1),
                            value: animateCards
                        )
                }
            }
        }
        .padding(.top, 20)
    }
    
    // MARK: - 訂閱管理區域
    private var subscriptionManagementSection: some View {
        VStack(spacing: 20) {
            Text("訂閱管理")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.gold)
            
            VStack(spacing: 15) {
                // 當前方案信息
                if let subscription = subscriptionManager.currentSubscription {
                    VStack(spacing: 12) {
                        HStack {
                            Text("當前方案")
                                .foregroundColor(.gray)
                            Spacer()
                            Text(subscription.appleTransactionId?.contains("monthly") == true ? "月度會員" : "年度會員")
                                .fontWeight(.semibold)
                                .foregroundColor(.gold)
                        }
                        
                        HStack {
                            Text("狀態")
                                .foregroundColor(.gray)
                            Spacer()
                            Text(subscription.status.displayName)
                                .fontWeight(.semibold)
                                .foregroundColor(subscription.status.isActive ? .green : .orange)
                        }
                        
                        if let endDate = subscription.currentPeriodEnd {
                            HStack {
                                Text("下次續費")
                                    .foregroundColor(.gray)
                                Spacer()
                                Text(endDate.formatted(date: .abbreviated, time: .omitted))
                                    .fontWeight(.semibold)
                                    .foregroundColor(.white)
                            }
                        }
                    }
                    .padding(20)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.white.opacity(0.05))
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.gold.opacity(0.3), lineWidth: 1)
                            )
                    )
                }
                
                // 管理按鈕
                VStack(spacing: 12) {
                    Button(action: {
                        showingManageSubscription = true
                    }) {
                        HStack {
                            Image(systemName: "gear")
                            Text("管理訂閱")
                        }
                        .foregroundColor(.white)
                        .padding(.vertical, 12)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Color.purple.opacity(0.6))
                        )
                    }
                    
                    Button(action: {
                        showingCancelConfirmation = true
                    }) {
                        HStack {
                            Image(systemName: "xmark.circle")
                            Text("取消訂閱")
                        }
                        .foregroundColor(.red)
                        .padding(.vertical, 12)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(Color.red.opacity(0.5), lineWidth: 1)
                        )
                    }
                }
            }
        }
    }
    
    // MARK: - 免費用戶狀態
    private var freeUserStatusSection: some View {
        VStack(spacing: 15) {
            Text("當前狀態")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.gold)
            
            HStack(spacing: 20) {
                VStack {
                    Text("\(subscriptionManager.remainingFreeReadings)")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.gold)
                    Text("剩餘免費次數")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Divider()
                    .frame(height: 40)
                    .background(Color.white.opacity(0.3))
                
                VStack {
                    Text("\(subscriptionManager.dailyReadingsUsed)")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.purple)
                    Text("今日已使用")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.white.opacity(0.05))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.purple.opacity(0.3), lineWidth: 1)
                    )
            )
        }
    }
    
    // MARK: - 功能區域
    private var featuresSection: some View {
        VStack(spacing: 15) {
            Text("Premium 特權")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.gold)
                        
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 15) {
                FeatureCard(
                    icon: "infinity",
                    title: "無限占卜",
                    description: "不受次數限制",
                    color: .purple
                )
                
                FeatureCard(
                    icon: "brain.head.profile",
                    title: "AI 深度解讀",
                    description: "專業級分析",
                    color: .indigo
                )
                
                FeatureCard(
                    icon: "star.fill",
                    title: "專屬牌陣",
                    description: "高級占卜方式",
                    color: .gold
                )
                
                FeatureCard(
                    icon: "chart.line.uptrend.xyaxis",
                    title: "趨勢分析",
                    description: "運勢走向預測",
                    color: .teal
                )
                
                FeatureCard(
                    icon: "bookmark.fill",
                    title: "收藏功能",
                    description: "保存重要解讀",
                    color: .pink
                )
                
                FeatureCard(
                    icon: "bell.fill",
                    title: "每日提醒",
                    description: "占卜與冥想",
                    color: .orange
                )
            }
        }
    }
    
    // MARK: - 定價方案區域
    private var pricingPlansSection: some View {
        VStack(spacing: 20) {
            Text("選擇您的方案")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.gold)
            
            VStack(spacing: 15) {
                ForEach(subscriptionManager.subscriptionPlans, id: \.id) { plan in
                    PricingCard(
                        plan: plan,
                        isSelected: selectedPlan?.id == plan.id,
                        onSelect: { selectedPlan = plan }
                    )
                }
            }
        }
    }
    
    // MARK: - 訂閱按鈕
    private var subscribeButton: some View {
        VStack(spacing: 15) {
            if selectedPlan != nil {
                Button(action: {
                    showingPurchaseSheet = true
                }) {
                    HStack {
                        if isLoading || paymentManager.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .scaleEffect(0.8)
                        } else {
                            Image(systemName: "crown.fill")
                        }
                        
                        Text(getSubscriptionButtonText())
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(.white)
                    .padding(.vertical, 16)
                    .frame(maxWidth: .infinity)
                    .background(
                        LinearGradient(
                            gradient: Gradient(colors: [.gold, .orange]),
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .cornerRadius(12)
                    .shadow(color: .gold.opacity(0.3), radius: 8, x: 0, y: 4)
                }
                .disabled(isLoading || paymentManager.isLoading || !userSession.isAuthenticated)
                
                Text("7天免費試用，隨時可取消")
                    .font(.caption)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
            } else {
                Text("請選擇一個訂閱方案")
                    .foregroundColor(.gray)
                    .padding(.vertical, 16)
            }
        }
    }
    
    private func handleManageSubscription() {
        Task {
            isLoading = true

            // 使用 Apple IAP 的訂閱管理方式
            paymentManager.openAppStoreManageSubscriptions()

            isLoading = false
        }
    }
    
    // MARK: - 輔助方法
    private func getSubscriptionButtonText() -> String {
        if isLoading || paymentManager.isLoading {
            return "處理中..."
        }
        
        if !userSession.isAuthenticated {
            return "請先登入"
        }
        
        switch paymentManager.paymentStatus {
        case .processing:
            return "處理中..."
        case .succeeded:
            return "訂閱成功"
        default:
            return "開始 Premium 體驗"
        }
    }
    
    // MARK: - Data Loading Methods
    private func loadSubscriptionData() {
        isLoading = true
        
        Task {
            // 檢查當前訂閱狀態
            subscriptionManager.loadUserSubscription()
            
            // 如果用戶已登入，同步訂閱狀態
            if userSession.isAuthenticated {
                await subscriptionManager.syncWithAppleIAP()
            }
            
            await MainActor.run {
                isLoading = false
            }
        }
    }
    
    private func refreshSubscriptionData() async {
        // 強制刷新訂閱狀態
        subscriptionManager.loadUserSubscription()
        
        if userSession.isAuthenticated {
            await subscriptionManager.syncWithAppleIAP()
        }
        
        await MainActor.run {
            successMessage = "訂閱狀態已更新"
            showingSuccess = true
        }
    }
    
    private func handleCancelSubscription() async {
        isLoading = true
        
        await subscriptionManager.cancelSubscription()
        
        await MainActor.run {
            successMessage = "訂閱已成功取消"
            showingSuccess = true
            isLoading = false
        }
    }
}

struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(color)
            
            Text(title)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.white)
            
            Text(description)
                .font(.caption)
                .foregroundColor(.gray)
                .multilineTextAlignment(.center)
        }
        .frame(height: 100)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.white.opacity(0.05))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(color.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

struct PricingCard: View {
    let plan: SubscriptionPlan
    let isSelected: Bool
    let onSelect: () -> Void
    
    var body: some View {
        Button(action: onSelect) {
            let cardContent = VStack(spacing: 15) {
                // Plan header
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(plan.name)
                            .font(.headline)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                        
                        if plan.interval == .yearly {
                            Text("最受歡迎")
                                .font(.caption)
                                .fontWeight(.medium)
                                .foregroundColor(.gold)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 2)
                                .background(
                                    Capsule()
                                        .fill(Color.gold.opacity(0.2))
                                )
                        }
                    }
                    
                    Spacer()
                    
                    VStack(alignment: .trailing, spacing: 2) {
                        HStack(alignment: .bottom, spacing: 4) {
                            Text("NT$")
                                .font(.caption)
                                .foregroundColor(.gray)
                            Text("\(Int(plan.price / 100))")
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        }
                        
                        Text(plan.intervalText)
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                }
                
                // Features
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(plan.features, id: \.self) { feature in
                        HStack(spacing: 8) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.caption)
                                .foregroundColor(.gold)
                            
                            Text(feature)
                                .font(.caption)
                                .foregroundColor(.gray)
                            
                            Spacer()
                        }
                    }
                }
            }
            
            let backgroundShape = RoundedRectangle(cornerRadius: 15)
                .fill(Color.white.opacity(isSelected ? 0.1 : 0.05))
                .overlay(
                    RoundedRectangle(cornerRadius: 15)
                        .stroke(
                            isSelected ? Color.gold : Color.white.opacity(0.2),
                            lineWidth: isSelected ? 2 : 1
                        )
                )
            
            let shadowColor = isSelected ? Color.gold.opacity(0.3) : Color.clear
            let shadowRadius: CGFloat = isSelected ? 10 : 0
            let shadowY: CGFloat = isSelected ? 5 : 0
            
            cardContent
                .padding(20)
                .background(backgroundShape)
                .scaleEffect(isSelected ? 1.02 : 1.0)
                .shadow(
                    color: shadowColor,
                    radius: shadowRadius,
                    x: 0,
                    y: shadowY
                )
        }
        .buttonStyle(PlainButtonStyle())
        .animation(.spring(response: 0.3, dampingFraction: 0.7), value: isSelected)
    }
}

struct PurchaseConfirmationView: View {
    let selectedPlan: SubscriptionPlan?
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var paymentManager: PaymentManager
    @EnvironmentObject var subscriptionManager: SubscriptionManager
    @EnvironmentObject private var userSession: UserSession
    @State private var isLoading = false
    @State private var showingError = false
    @State private var errorMessage: String?
    @State private var showingSuccess = false
    @State private var successMessage: String?
    
    var body: some View {
        NavigationView {
            VStack(spacing: 30) {
                Spacer()
                
                planSummarySection
                
                Spacer()
                
                actionButtonsSection
            }
            .padding(20)
            .background(backgroundGradient)
            .navigationTitle("")
            .navigationBarTitleDisplayMode(.inline)
            .preferredColorScheme(.dark)
        }
        .presentationDetents([.medium, .large])
        .alert("錯誤", isPresented: $showingError) {
            Button("確定", role: .cancel) {
                errorMessage = nil
            }
        } message: {
            if let errorMessage = errorMessage {
                Text(errorMessage)
            }
        }
        .alert("成功", isPresented: $showingSuccess) {
            Button("確定", role: .cancel) {
                dismiss()
            }
        } message: {
             Text(successMessage ?? "訂閱成功")
         }
     }
     
     private var planSummarySection: some View {
         VStack(spacing: 20) {
             crownIcon
             
             titleSection
             
             priceDetailsSection
         }
     }
     
     private var crownIcon: some View {
         Image(systemName: "crown.fill")
             .font(.system(size: 60))
             .foregroundStyle(
                 LinearGradient(
                     colors: [.gold, .yellow],
                     startPoint: .topLeading,
                     endPoint: .bottomTrailing
                 )
             )
     }
     
     private var titleSection: some View {
         VStack(spacing: 8) {
             Text("確認訂閱")
                 .font(.title)
                 .fontWeight(.bold)
                 .foregroundColor(.white)
             
             Text(selectedPlan?.name ?? "")
                 .font(.headline)
                 .foregroundColor(.gold)
         }
     }
     
     private var priceDetailsSection: some View {
         VStack(spacing: 12) {
             if let plan = selectedPlan {
                 priceRow(plan: plan)
                 
                 if plan.interval == .yearly {
                     savingsRow(plan: plan)
                 }
                 
                 Divider()
                     .background(Color.white.opacity(0.2))
                 
                 totalRow(plan: plan)
             }
         }
         .padding(20)
         .background(
             RoundedRectangle(cornerRadius: 12)
                 .fill(Color.white.opacity(0.05))
                 .overlay(
                     RoundedRectangle(cornerRadius: 12)
                         .stroke(Color.purple.opacity(0.3), lineWidth: 1)
                 )
         )
     }
     
     private func priceRow(plan: SubscriptionPlan) -> some View {
         HStack {
             Text("價格:")
                 .foregroundColor(.gray)
             Spacer()
             Text("NT$\(Int(plan.price / 100)) / \(plan.intervalText)")
                 .fontWeight(.semibold)
                 .foregroundColor(.white)
         }
     }
     
     private func savingsRow(plan: SubscriptionPlan) -> some View {
         HStack {
             Text("節省:")
                 .foregroundColor(.gray)
             Spacer()
             Text("NT$\(Int((plan.price * 12 - plan.price) / 100))")
                 .fontWeight(.semibold)
                 .foregroundColor(.green)
         }
     }
     
     private func totalRow(plan: SubscriptionPlan) -> some View {
         HStack {
             Text("總計:")
                 .font(.headline)
                 .foregroundColor(.white)
             Spacer()
             Text("NT$\(Int(plan.price / 100))")
                 .font(.headline)
                 .fontWeight(.bold)
                 .foregroundColor(.gold)
         }
     }
     
     private var actionButtonsSection: some View {
         VStack(spacing: 15) {
             confirmButton
             
             cancelButton
         }
     }
     
     private var confirmButton: some View {
         Button(action: {
             if let plan = selectedPlan {
                 Task {
                     await handleSubscription(plan: plan)
                 }
             }
         }) {
             HStack {
                 let isProcessing = isLoading || (paymentManager.paymentStatus.isProcessing)
                 
                 if isProcessing {
                     ProgressView()
                         .progressViewStyle(CircularProgressViewStyle(tint: .black))
                         .scaleEffect(0.8)
                 }
                 
                 Text(isProcessing ? "處理中..." : "確認購買")
                     .font(.headline)
                     .fontWeight(.semibold)
             }
             .foregroundColor(.black)
             .padding(.vertical, 16)
             .frame(maxWidth: .infinity)
             .background(
                 LinearGradient(
                     colors: [.gold, .yellow],
                     startPoint: .leading,
                     endPoint: .trailing
                 )
             )
             .cornerRadius(25)
             .shadow(color: .gold.opacity(0.4), radius: 15, x: 0, y: 8)
         }
         .disabled(isLoading || paymentManager.paymentStatus.isProcessing)
     }
     
     private var cancelButton: some View {
         Button("取消") {
             dismiss()
         }
         .font(.body)
         .foregroundColor(.gray)
     }
     
     private var backgroundGradient: some View {
         LinearGradient(
             gradient: Gradient(colors: [Color.black, Color.purple.opacity(0.2)]),
             startPoint: .top,
             endPoint: .bottom
         )
     }
     
     // MARK: - Subscription Handling
     private func handleSubscription(plan: SubscriptionPlan) async {
         isLoading = true
         
         // 創建訂閱
         await paymentManager.createSubscription(plan: plan)
         
         // 檢查支付狀態
         if case .succeeded = paymentManager.paymentStatus {
             // 更新訂閱狀態
             subscriptionManager.loadUserSubscription()
             
             // 同步到後端
             if userSession.isAuthenticated {
                 await subscriptionManager.syncWithAppleIAP()
             }
             
             await MainActor.run {
                 successMessage = "恭喜！您已成功訂閱 \(plan.name)"
                 showingSuccess = true
                 isLoading = false
             }
         } else if case .failed = paymentManager.paymentStatus {
             await MainActor.run {
                 errorMessage = paymentManager.errorMessage ?? "支付失敗，請重試"
                 showingError = true
                 isLoading = false
             }
         } else {
             await MainActor.run {
                 isLoading = false
             }
         }
     }
}

// SubscriptionPlan 結構體已在 SubscriptionManager.swift 中定義

#Preview {
    TarotSubscriptionView()
}
