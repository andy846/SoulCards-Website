import SwiftUI

struct TarotProfileView: View {
    @EnvironmentObject var userSession: UserSession
    @EnvironmentObject var authManager: AuthenticationManager
    @State private var showingLogoutAlert = false
    @State private var showingEditProfile = false
    @State private var isLoadingProfile = false
    @State private var profileLoadError: String? = nil
    @State private var avatarUrl: String? = nil
    
    #if DEBUG
    @State private var showingResetSubscriptionAlert = false
    @EnvironmentObject var subscriptionManager: SubscriptionManager
    #endif
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 28) {
                    // 用戶頭像和基本信息
                    VStack(spacing: 20) {
                        // 頭像上傳組件
                        AvatarUploadView(
                            avatarUrl: $avatarUrl,
                            size: 120
                        )
                        
                        // 用戶信息
                        VStack(spacing: 10) {
                            Text(displayUserName)
                                .font(.system(size: 26, weight: .bold, design: .rounded))
                                .foregroundStyle(
                                    LinearGradient(
                                        gradient: Gradient(colors: [.gold, .starSilver]),
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                            
                            Text(userSession.currentUser?.email ?? "")
                                .font(.body)
                                .foregroundColor(.starSilver.opacity(0.7))
                            
                            // 訂閱狀態 - 改進設計
                            HStack(spacing: 8) {
                                Image(systemName: subscriptionIcon)
                                    .foregroundColor(subscriptionColor)
                                    .font(.system(size: 14, weight: .semibold))
                                Text(subscriptionStatusText)
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundColor(subscriptionColor)
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(
                                Capsule()
                                    .fill(subscriptionColor.opacity(0.12))
                                    .overlay(
                                        Capsule()
                                            .stroke(
                                                LinearGradient(
                                                    gradient: Gradient(colors: [subscriptionColor.opacity(0.5), subscriptionColor.opacity(0.2)]),
                                                    startPoint: .topLeading,
                                                    endPoint: .bottomTrailing
                                                ),
                                                lineWidth: 1.5
                                            )
                                    )
                            )
                            .shadow(color: subscriptionColor.opacity(0.2), radius: 8, x: 0, y: 3)
                        }
                    }
                    .padding(.top, 30)
                    
                    // 個人資料詳細信息卡片
                    profileDetailsCard
                    
                    // 編輯個人資料按鈕
                    Button(action: {
                        showingEditProfile = true
                    }) {
                        HStack(spacing: 10) {
                            Image(systemName: "person.crop.circle")
                                .font(.system(size: 18, weight: .semibold))
                            Text("編輯個人資料")
                                .font(.system(size: 17, weight: .semibold))
                        }
                        .foregroundColor(.gold)
                        .padding(.vertical, 16)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(Color.gold.opacity(0.08))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14)
                                        .stroke(
                                            LinearGradient(
                                                gradient: Gradient(colors: [Color.gold.opacity(0.5), Color.gold.opacity(0.2)]),
                                                startPoint: .topLeading,
                                                endPoint: .bottomTrailing
                                            ),
                                            lineWidth: 1.5
                                        )
                                )
                        )
                        .shadow(color: Color.gold.opacity(0.15), radius: 8, x: 0, y: 3)
                    }
                    .padding(.horizontal, 20)
                    
                    #if DEBUG
                    // 開發者重置訂閱按鈕
                    Button(action: {
                        showingResetSubscriptionAlert = true
                    }) {
                        HStack(spacing: 10) {
                            Image(systemName: "arrow.clockwise.circle")
                                .font(.system(size: 18, weight: .semibold))
                            Text("重置訂閱狀態 (開發)")
                                .font(.system(size: 17, weight: .semibold))
                        }
                        .foregroundColor(.orange)
                        .padding(.vertical, 16)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(Color.orange.opacity(0.06))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14)
                                        .stroke(
                                            LinearGradient(
                                                gradient: Gradient(colors: [Color.orange.opacity(0.4), Color.orange.opacity(0.2)]),
                                                startPoint: .topLeading,
                                                endPoint: .bottomTrailing
                                            ),
                                            lineWidth: 1.5
                                        )
                                )
                        )
                        .shadow(color: Color.orange.opacity(0.12), radius: 8, x: 0, y: 3)
                    }
                    .padding(.horizontal, 20)
                    #endif
                    
                    // 登出按鈕
                    Button(action: {
                        showingLogoutAlert = true
                    }) {
                        HStack(spacing: 10) {
                            Image(systemName: "rectangle.portrait.and.arrow.right")
                                .font(.system(size: 18, weight: .semibold))
                            Text("登出")
                                .font(.system(size: 17, weight: .semibold))
                        }
                        .foregroundColor(.red)
                        .padding(.vertical, 16)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(Color.red.opacity(0.06))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14)
                                        .stroke(
                                            LinearGradient(
                                                gradient: Gradient(colors: [Color.red.opacity(0.4), Color.red.opacity(0.2)]),
                                                startPoint: .topLeading,
                                                endPoint: .bottomTrailing
                                            ),
                                            lineWidth: 1.5
                                        )
                                )
                        )
                        .shadow(color: Color.red.opacity(0.12), radius: 8, x: 0, y: 3)
                    }
                    .padding(.horizontal, 20)
                    
                    Spacer(minLength: 40)
                    
                    // 版權信息 - 改進樣式
                    VStack(spacing: 6) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 14))
                            .foregroundColor(.gold.opacity(0.5))
                        
                        Text("© 2025 Andy Innovations")
                            .font(.system(size: 12, weight: .medium, design: .rounded))
                            .foregroundColor(.starSilver.opacity(0.6))
                        
                        Text("All rights reserved.")
                            .font(.system(size: 11, design: .rounded))
                            .foregroundColor(.starSilver.opacity(0.45))
                    }
                    .padding(.bottom, 30)
                }
            }
            .background(
                LinearGradient(
                    colors: [
                        Color.mysticalPurple.opacity(0.8),
                        Color.deepPurple.opacity(0.6),
                        Color.cosmicBlack
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()
            )
            .navigationTitle("個人資料")
            .navigationBarTitleDisplayMode(.large)
            .onAppear {
                // 初始化頭像 URL
                avatarUrl = userSession.userProfile?.avatarUrl
                
                Task {
                    await loadProfileWithRetry()
                }
            }
            .onChange(of: avatarUrl) { _, newValue in
                // 當頭像 URL 更新時，重新載入用戶資料以同步變更
                Task {
                    await loadProfileWithRetry()
                }
            }
        }
        .alert("確認登出", isPresented: $showingLogoutAlert) {
            Button("取消", role: .cancel) { }
            Button("登出", role: .destructive) {
                Task {
                    await authManager.signOut()
                }
            }
        } message: {
            Text("您確定要登出嗎？")
        }
        #if DEBUG
        .alert("重置訂閱狀態", isPresented: $showingResetSubscriptionAlert) {
            Button("取消", role: .cancel) { }
            Button("重置", role: .destructive) {
                Task {
                    await resetSubscriptionStatus()
                }
            }
        } message: {
            Text("這將清除所有訂閱狀態和相關數據，僅用於開發測試。您確定要繼續嗎？")
        }
        #endif
        .sheet(isPresented: $showingEditProfile) {
            EditProfileSheet()
        }
        .onChange(of: showingEditProfile) { _, isShowing in
            if !isShowing {
                Task {
                    await loadProfileWithRetry()
                }
            }
        }
    }
    
    // MARK: - Computed Properties
    
    private var profileDetailsCard: some View {
        VStack(spacing: 20) {
            HStack {
                HStack(spacing: 8) {
                    Image(systemName: "person.text.rectangle")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.gold)
                    Text("個人資料詳情")
                        .font(.system(size: 19, weight: .bold, design: .rounded))
                        .foregroundColor(.gold)
                }
                Spacer()
            }
            
            VStack(spacing: 16) {
                if let profile = userSession.userProfile {
                    profileDetailRow(icon: "gift.fill", title: "生日", value: formatDate(profile.birthDate))
                    Divider().background(Color.starSilver.opacity(0.2))
                    profileDetailRow(icon: "star.fill", title: "星座", value: profile.zodiacSign ?? "未設定")
                    Divider().background(Color.starSilver.opacity(0.2))
                    profileDetailRow(icon: "quote.bubble.fill", title: "個人簡介", value: profile.bio ?? "未設定")
                    Divider().background(Color.starSilver.opacity(0.2))
                    profileDetailRow(icon: "globe", title: "偏好語言", value: profile.preferredLanguage)
                    Divider().background(Color.starSilver.opacity(0.2))
                    profileDetailRow(icon: "bell.fill", title: "通知設定", value: profile.notificationEnabled ? "開啟" : "關閉")
                    Divider().background(Color.starSilver.opacity(0.2))
                    profileDetailRow(icon: "paintbrush.fill", title: "主題偏好", value: profile.themePreference)
                    Divider().background(Color.starSilver.opacity(0.2))
                    profileDetailRow(icon: "clock.fill", title: "最後登入", value: profile.formattedLastSignInTime)
                } else if isLoadingProfile {
                    VStack(spacing: 16) {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .gold))
                            .scaleEffect(1.2)
                        Text("載入個人資料中...")
                            .font(.system(size: 15, weight: .medium))
                            .foregroundColor(.starSilver.opacity(0.7))
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 30)
                } else if let error = profileLoadError {
                    VStack(spacing: 16) {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .font(.system(size: 36))
                            .foregroundColor(.orange)
                        Text("載入失敗")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.orange)
                        Text(error)
                            .font(.system(size: 13))
                            .foregroundColor(.starSilver.opacity(0.7))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                        Button("重試") {
                            Task {
                                await loadProfileWithRetry()
                            }
                        }
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundColor(.cosmicBlack)
                        .padding(.horizontal, 24)
                        .padding(.vertical, 10)
                        .background(
                            Capsule()
                                .fill(Color.gold)
                        )
                        .shadow(color: Color.gold.opacity(0.3), radius: 8, x: 0, y: 3)
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 30)
                } else {
                    VStack(spacing: 16) {
                        Image(systemName: "person.crop.circle.badge.plus")
                            .font(.system(size: 40))
                            .foregroundColor(.gold)
                        Text("尚未設定個人資料")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.starSilver)
                        Text("點擊下方按鈕開始設定您的個人資料")
                            .font(.system(size: 13))
                            .foregroundColor(.starSilver.opacity(0.7))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                        Button("創建資料") {
                            Task {
                                await createDefaultProfile()
                            }
                        }
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundColor(.cosmicBlack)
                        .padding(.horizontal, 24)
                        .padding(.vertical, 10)
                        .background(
                            Capsule()
                                .fill(Color.gold)
                        )
                        .shadow(color: Color.gold.opacity(0.3), radius: 8, x: 0, y: 3)
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 30)
                }
            }
        }
        .padding(24)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(
                    LinearGradient(
                        gradient: Gradient(colors: [Color.starSilver.opacity(0.08), Color.starSilver.opacity(0.04)]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(
                            LinearGradient(
                                gradient: Gradient(colors: [Color.gold.opacity(0.3), Color.starSilver.opacity(0.2)]),
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 1
                        )
                )
        )
        .shadow(color: Color.black.opacity(0.2), radius: 15, x: 0, y: 5)
        .padding(.horizontal, 20)
    }
    
    private func profileDetailRow(icon: String, title: String, value: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(.gold.opacity(0.8))
                .frame(width: 24)
            
            Text(title)
                .font(.system(size: 15, weight: .medium))
                .foregroundColor(.starSilver.opacity(0.9))
            
            Spacer()
            
            Text(value)
                .font(.system(size: 15, weight: .regular))
                .foregroundColor(.starSilver.opacity(0.7))
                .multilineTextAlignment(.trailing)
        }
    }
    
    private func formatDate(_ date: Date?) -> String {
        guard let date = date else { return "未設定" }
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.locale = Locale(identifier: "zh_TW")
        return formatter.string(from: date)
    }
    
    private var displayUserName: String {
        if let profile = userSession.userProfile,
           let fullName = profile.fullName, !fullName.isEmpty {
            return fullName
        }
        
        if let user = userSession.currentUser,
           let fullName = user.fullName, !fullName.isEmpty {
            return fullName
        }
        
        if let user = userSession.currentUser {
            let emailComponents = user.email.components(separatedBy: "@")
            return emailComponents.first?.capitalized ?? user.email
        }
        
        return "未知用戶"
    }
    
    private var subscriptionStatusText: String {
        guard let user = userSession.currentUser else { return "未激活" }
        return user.subscriptionStatus.displayName
    }
    
    private var subscriptionIcon: String {
        guard let user = userSession.currentUser else { return "crown" }
        
        switch user.subscriptionStatus {
        case .active, .trialing:
            return "crown.fill"
        default:
            return "crown"
        }
    }
    
    private var subscriptionColor: Color {
        guard let user = userSession.currentUser else { return .gray }
        
        switch user.subscriptionStatus {
        case .active:
            return .gold
        case .trialing:
            return .blue
        case .pastDue:
            return .orange
        case .canceled, .expired:
            return .red
        default:
            return .gray
        }
    }
    
    // MARK: - Methods
    
    private func loadProfileWithRetry() async {
        print("🔄 TarotProfileView: 開始載入個人資料")
        isLoadingProfile = true
        profileLoadError = nil
        
        do {
            try await userSession.loadUserProfile()
            print("✅ TarotProfileView: 個人資料載入成功")
            profileLoadError = nil
            
            // 同步頭像 URL
            await MainActor.run {
                avatarUrl = userSession.userProfile?.avatarUrl
            }
        } catch {
            print("❌ TarotProfileView: 個人資料載入失敗 - \(error)")
            profileLoadError = "載入個人資料失敗：\(error.localizedDescription)"
        }
        
        isLoadingProfile = false
    }
    
    private func createDefaultProfile() async {
        print("🔄 TarotProfileView: 開始創建默認個人資料")
        isLoadingProfile = true
        profileLoadError = nil
        
        do {
            let supabaseManager = SupabaseManager.shared
            try await supabaseManager.createDefaultUserProfile()
            print("✅ TarotProfileView: 默認個人資料創建成功")
            
            try await userSession.loadUserProfile()
            print("✅ TarotProfileView: 個人資料重新載入成功")
            profileLoadError = nil
        } catch {
            print("❌ TarotProfileView: 創建默認個人資料失敗 - \(error)")
            profileLoadError = "創建個人資料失敗：\(error.localizedDescription)"
        }
        
        isLoadingProfile = false
    }
    
    #if DEBUG
    private func resetSubscriptionStatus() async {
        print("🔄 [TarotProfileView] 開始重置訂閱狀態...")
        
        do {
            await subscriptionManager.resetSubscriptionForDevelopment()
            print("✅ [TarotProfileView] 訂閱狀態重置完成")
        } catch {
            print("❌ [TarotProfileView] 重置訂閱狀態失敗: \(error)")
        }
    }
    #endif
}

// MARK: - EditProfileSheet
struct EditProfileSheet: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var userSession: UserSession
    
    @State private var displayName: String = ""
    @State private var birthDate: Date = Date()
    @State private var zodiacSign: String = ""
    @State private var bio: String = ""
    @State private var preferredLanguage: String = "zh-TW"
    @State private var notificationEnabled: Bool = true
    @State private var themePreference: String = "system"
    
    @State private var isLoading: Bool = false
    @State private var showingAlert: Bool = false
    @State private var alertMessage: String = ""
    @State private var showDatePicker: Bool = false
    @State private var showZodiacPicker: Bool = false
    @State private var showLanguagePicker: Bool = false
    @State private var showThemePicker: Bool = false
    
    private let zodiacSigns = [
        "白羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座",
        "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"
    ]
    
    private let languages = [
        ("zh-TW", "繁體中文"),
        ("zh-CN", "簡體中文"),
        ("en", "English"),
        ("ja", "日本語")
    ]
    
    private let themes = [
        ("system", "跟隨系統"),
        ("light", "淺色模式"),
        ("dark", "深色模式")
    ]
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 28) {
                    // 頭像區域 - 改進設計
                    VStack(spacing: 16) {
                        ZStack {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        gradient: Gradient(colors: [Color.gold.opacity(0.25), Color.starSilver.opacity(0.15)]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 90, height: 90)
                                .shadow(color: Color.gold.opacity(0.25), radius: 12, x: 0, y: 4)
                            
                            Circle()
                                .fill(Color.starSilver.opacity(0.12))
                                .frame(width: 80, height: 80)
                                .overlay(
                                    Image(systemName: "person.fill")
                                        .font(.system(size: 32))
                                        .foregroundColor(.gold)
                                )
                        }
                        
                        Text("編輯頭像")
                            .font(.system(size: 12, weight: .medium))
                            .foregroundColor(.gold.opacity(0.7))
                    }
                    .padding(.top, 20)
                    
                    VStack(spacing: 24) {
                        // 顯示名稱
                        formSection(icon: "person.fill", title: "顯示名稱") {
                            TextField("輸入您的顯示名稱", text: $displayName)
                                .textFieldStyle(ProfileTextFieldStyle())
                        }
                        
                        // 生日
                        formSection(icon: "gift.fill", title: "生日") {
                            Button(action: { showDatePicker = true }) {
                                HStack {
                                    Text(formatDate(birthDate))
                                        .foregroundColor(.starSilver)
                                    Spacer()
                                    Image(systemName: "calendar")
                                        .foregroundColor(.gold)
                                }
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color.starSilver.opacity(0.08))
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                                        )
                                )
                            }
                        }
                        
                        // 星座
                        formSection(icon: "star.fill", title: "星座") {
                            Button(action: { showZodiacPicker = true }) {
                                HStack {
                                    Text(zodiacSign.isEmpty ? "選擇星座" : zodiacSign)
                                        .foregroundColor(zodiacSign.isEmpty ? .starSilver.opacity(0.5) : .starSilver)
                                    Spacer()
                                    Image(systemName: "chevron.down")
                                        .foregroundColor(.gold)
                                        .font(.system(size: 14, weight: .medium))
                                }
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color.starSilver.opacity(0.08))
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                                        )
                                )
                            }
                        }
                        
                        // 個人簡介
                        formSection(icon: "quote.bubble.fill", title: "個人簡介") {
                            ZStack(alignment: .topLeading) {
                                if bio.isEmpty {
                                    Text("介紹一下自己...")
                                        .foregroundColor(.starSilver.opacity(0.4))
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 16)
                                }
                                TextEditor(text: $bio)
                                    .frame(minHeight: 100, maxHeight: 140)
                                    .padding(8)
                                    .background(
                                        RoundedRectangle(cornerRadius: 12)
                                            .fill(Color.starSilver.opacity(0.08))
                                            .overlay(
                                                RoundedRectangle(cornerRadius: 12)
                                                    .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                                            )
                                    )
                                    .foregroundColor(.starSilver)
                                    .scrollContentBackground(.hidden)
                            }
                        }
                        
                        // 偏好語言
                        formSection(icon: "globe", title: "偏好語言") {
                            Button(action: { showLanguagePicker = true }) {
                                HStack {
                                    Text(languages.first { $0.0 == preferredLanguage }?.1 ?? "繁體中文")
                                        .foregroundColor(.starSilver)
                                    Spacer()
                                    Image(systemName: "chevron.down")
                                        .foregroundColor(.gold)
                                        .font(.system(size: 14, weight: .medium))
                                }
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color.starSilver.opacity(0.08))
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                                        )
                                )
                            }
                        }
                        
                        // 通知設定
                        formSection(icon: "bell.fill", title: "通知設定") {
                            HStack {
                                Text("接收通知")
                                    .foregroundColor(.starSilver)
                                Spacer()
                                Toggle("", isOn: $notificationEnabled)
                                    .toggleStyle(SwitchToggleStyle(tint: .gold))
                                    .labelsHidden()
                            }
                            .padding()
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(Color.starSilver.opacity(0.08))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12)
                                            .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                                    )
                            )
                        }
                        
                        // 主題偏好
                        formSection(icon: "paintbrush.fill", title: "主題偏好") {
                            Button(action: { showThemePicker = true }) {
                                HStack {
                                    Text(themes.first { $0.0 == themePreference }?.1 ?? "跟隨系統")
                                        .foregroundColor(.starSilver)
                                    Spacer()
                                    Image(systemName: "chevron.down")
                                        .foregroundColor(.gold)
                                        .font(.system(size: 14, weight: .medium))
                                }
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color.starSilver.opacity(0.08))
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                                        )
                                )
                            }
                        }
                    }
                    .padding(.horizontal, 20)
                    
                    // 保存按鈕
                    Button(action: saveProfile) {
                        HStack(spacing: 10) {
                            if isLoading {
                                ProgressView()
                                    .progressViewStyle(CircularProgressViewStyle(tint: .cosmicBlack))
                                    .scaleEffect(0.9)
                            }
                            Text(isLoading ? "保存中..." : "保存更改")
                                .font(.system(size: 17, weight: .bold))
                        }
                        .foregroundColor(.cosmicBlack)
                        .padding(.vertical, 16)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(
                                    LinearGradient(
                                        gradient: Gradient(colors: [Color.gold, Color.gold.opacity(0.8)]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                        )
                        .shadow(color: Color.gold.opacity(0.4), radius: 12, x: 0, y: 5)
                    }
                    .disabled(isLoading || displayName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                    .opacity((isLoading || displayName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty) ? 0.6 : 1.0)
                    .padding(.horizontal, 20)
                    .padding(.bottom, 30)
                }
            }
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [Color.cosmicBlack, Color.cosmicBlack.opacity(0.95)]),
                    startPoint: .top,
                    endPoint: .bottom
                )
                .ignoresSafeArea()
            )
            .navigationTitle("編輯個人資料")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: { dismiss() }) {
                        HStack(spacing: 4) {
                            Image(systemName: "xmark")
                                .font(.system(size: 14, weight: .semibold))
                            Text("取消")
                                .font(.system(size: 16, weight: .medium))
                        }
                        .foregroundColor(.gold)
                    }
                }
            }
        }
        .onAppear {
            loadUserData()
        }
        .onChange(of: birthDate) { _, newDate in
            zodiacSign = calculateZodiacSign(from: newDate)
        }
        .alert("提示", isPresented: $showingAlert) {
            Button("確定") { }
        } message: {
            Text(alertMessage)
        }
        .sheet(isPresented: $showDatePicker) {
            datePickerSheet
        }
        .sheet(isPresented: $showZodiacPicker) {
            zodiacPickerSheet
        }
        .sheet(isPresented: $showLanguagePicker) {
            languagePickerSheet
        }
        .sheet(isPresented: $showThemePicker) {
            themePickerSheet
        }
    }
    
    // MARK: - Helper Views
    
    private func formSection<Content: View>(icon: String, title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.gold.opacity(0.8))
                Text(title)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.gold)
            }
            content()
        }
    }
    
    private var datePickerSheet: some View {
        NavigationView {
            VStack {
                DatePicker("選擇生日", selection: $birthDate, displayedComponents: .date)
                    .datePickerStyle(WheelDatePickerStyle())
                    .labelsHidden()
                    .padding()
                Spacer()
            }
            .background(Color.cosmicBlack.opacity(0.98))
            .navigationTitle("選擇生日")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("取消") {
                        showDatePicker = false
                    }
                    .foregroundColor(.gold)
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("確定") {
                        showDatePicker = false
                    }
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.gold)
                }
            }
        }
        .presentationDetents([.medium])
    }
    
    private var zodiacPickerSheet: some View {
        NavigationView {
            List(zodiacSigns, id: \.self) { sign in
                Button(action: {
                    zodiacSign = sign
                    showZodiacPicker = false
                }) {
                    HStack {
                        Text(sign)
                            .foregroundColor(.starSilver)
                        Spacer()
                        if zodiacSign == sign {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.gold)
                        }
                    }
                }
                .listRowBackground(Color.cosmicBlack.opacity(0.3))
            }
            .listStyle(PlainListStyle())
            .scrollContentBackground(.hidden)
            .background(Color.cosmicBlack.opacity(0.98))
            .navigationTitle("選擇星座")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("取消") {
                        showZodiacPicker = false
                    }
                    .foregroundColor(.gold)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }
    
    private var languagePickerSheet: some View {
        NavigationView {
            List(languages, id: \.0) { language in
                Button(action: {
                    preferredLanguage = language.0
                    showLanguagePicker = false
                }) {
                    HStack {
                        Text(language.1)
                            .foregroundColor(.starSilver)
                        Spacer()
                        if preferredLanguage == language.0 {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.gold)
                        }
                    }
                }
                .listRowBackground(Color.cosmicBlack.opacity(0.3))
            }
            .listStyle(PlainListStyle())
            .scrollContentBackground(.hidden)
            .background(Color.cosmicBlack.opacity(0.98))
            .navigationTitle("選擇語言")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("取消") {
                        showLanguagePicker = false
                    }
                    .foregroundColor(.gold)
                }
            }
        }
        .presentationDetents([.medium])
    }
    
    private var themePickerSheet: some View {
        NavigationView {
            List(themes, id: \.0) { theme in
                Button(action: {
                    themePreference = theme.0
                    showThemePicker = false
                }) {
                    HStack {
                        Text(theme.1)
                            .foregroundColor(.starSilver)
                        Spacer()
                        if themePreference == theme.0 {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.gold)
                        }
                    }
                }
                .listRowBackground(Color.cosmicBlack.opacity(0.3))
            }
            .listStyle(PlainListStyle())
            .scrollContentBackground(.hidden)
            .background(Color.cosmicBlack.opacity(0.98))
            .navigationTitle("選擇主題")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("取消") {
                        showThemePicker = false
                    }
                    .foregroundColor(.gold)
                }
            }
        }
        .presentationDetents([.medium])
    }
    
    // MARK: - Helper Methods
    
    private func loadUserData() {
        if let profile = userSession.userProfile {
            displayName = profile.fullName ?? ""
            birthDate = profile.birthDate ?? Date()
            zodiacSign = profile.zodiacSign ?? ""
            bio = profile.bio ?? ""
            preferredLanguage = profile.preferredLanguage
            notificationEnabled = profile.notificationEnabled
            themePreference = profile.themePreference
        } else {
            displayName = userSession.currentUser?.fullName ?? ""
        }
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.locale = Locale(identifier: "zh_TW")
        return formatter.string(from: date)
    }
    
    private func calculateZodiacSign(from date: Date) -> String {
        let calendar = Calendar.current
        let month = calendar.component(.month, from: date)
        let day = calendar.component(.day, from: date)
        
        switch (month, day) {
        case (3, 21...31), (4, 1...19):
            return "白羊座"
        case (4, 20...30), (5, 1...20):
            return "金牛座"
        case (5, 21...31), (6, 1...20):
            return "雙子座"
        case (6, 21...30), (7, 1...22):
            return "巨蟹座"
        case (7, 23...31), (8, 1...22):
            return "獅子座"
        case (8, 23...31), (9, 1...22):
            return "處女座"
        case (9, 23...30), (10, 1...22):
            return "天秤座"
        case (10, 23...31), (11, 1...21):
            return "天蠍座"
        case (11, 22...30), (12, 1...21):
            return "射手座"
        case (12, 22...31), (1, 1...19):
            return "摩羯座"
        case (1, 20...31), (2, 1...18):
            return "水瓶座"
        case (2, 19...29), (3, 1...20):
            return "雙魚座"
        default:
            return "白羊座"
        }
    }
    
    private func saveProfile() {
        let trimmedName = displayName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedName.isEmpty else { return }
        
        isLoading = true
        
        let calculatedZodiacSign = calculateZodiacSign(from: birthDate)
        
        Task {
            do {
                try await userSession.updateProfile(
                    displayName: trimmedName,
                    birthDate: birthDate,
                    zodiacSign: calculatedZodiacSign.isEmpty ? nil : calculatedZodiacSign,
                    bio: bio.isEmpty ? nil : bio,
                    preferredLanguage: preferredLanguage,
                    notificationEnabled: notificationEnabled,
                    themePreference: themePreference
                )
                await MainActor.run {
                    self.isLoading = false
                    self.alertMessage = "個人資料更新成功！"
                    self.showingAlert = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                        self.dismiss()
                    }
                }
            } catch {
                await MainActor.run {
                    self.isLoading = false
                    self.alertMessage = "更新失敗：\(error.localizedDescription)"
                    self.showingAlert = true
                }
            }
        }
    }
}

// MARK: - Profile Text Field Style
struct ProfileTextFieldStyle: TextFieldStyle {
    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.starSilver.opacity(0.08))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.starSilver.opacity(0.25), lineWidth: 1)
                    )
            )
            .foregroundColor(.starSilver)
    }
}
