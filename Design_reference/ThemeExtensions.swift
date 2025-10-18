//
//  ThemeExtensions.swift
//  SoulCards
//
//  Created by SOLO Coding on 2024/01/24.
//

import SwiftUI

// MARK: - Color Extensions
extension Color {
    // Primary Theme Colors
    static let mysticalPurple = Color(red: 0.4, green: 0.2, blue: 0.8)
    static let deepPurple = Color(red: 0.2, green: 0.1, blue: 0.4)
    static let gold = Color(red: 1.0, green: 0.84, blue: 0.0)
    static let lightGold = Color(red: 1.0, green: 0.92, blue: 0.4)
    static let darkGold = Color(red: 0.8, green: 0.6, blue: 0.0)
    
    // Secondary Colors
    static let mysticalBlue = Color(red: 0.1, green: 0.3, blue: 0.7)
    static let mysticalGold = Color(red: 0.9, green: 0.7, blue: 0.2)
    static let mysticalGreen = Color(red: 0.2, green: 0.7, blue: 0.4)
    static let mysticalPink = Color(red: 0.8, green: 0.3, blue: 0.6)
    static let cosmicIndigo = Color(red: 0.3, green: 0.0, blue: 0.5)
    static let starSilver = Color(red: 0.8, green: 0.8, blue: 0.9)
    static let cosmicBlack = Color(red: 0.05, green: 0.05, blue: 0.1)
    
    // Tarot Card Theme Colors
    static let deepBlue = Color(red: 0.1, green: 0.2, blue: 0.6)
    static let silver = Color(red: 0.75, green: 0.75, blue: 0.75)
    
    // Suit Colors
    static let wandsOrange = Color(red: 1.0, green: 0.5, blue: 0.0)
    static let cupsBlue = Color(red: 0.0, green: 0.5, blue: 1.0)
    static let swordsSilver = Color(red: 0.7, green: 0.7, blue: 0.8)
    static let pentaclesGreen = Color(red: 0.2, green: 0.7, blue: 0.3)
    
    // Background Gradients
    static let primaryGradient = LinearGradient(
        colors: [.mysticalPurple, .deepPurple],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let goldGradient = LinearGradient(
        colors: [.gold, .lightGold],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let cosmicGradient = LinearGradient(
        colors: [
            Color.cosmicIndigo.opacity(0.8),
            Color.mysticalPurple.opacity(0.6),
            Color.mysticalBlue.opacity(0.7),
            Color.deepPurple.opacity(0.8),
            Color.cosmicBlack.opacity(0.9)
        ],
        startPoint: .top,
        endPoint: .bottom
    )
    
    static let cardGradient = LinearGradient(
        colors: [.mysticalPurple.opacity(0.2), Color.gold.opacity(0.1)],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

// MARK: - Animation Extensions
extension Animation {
    static let mysticalSpring = Animation.spring(
        response: 0.6,
        dampingFraction: 0.8,
        blendDuration: 0.3
    )
    
    static let cardFlip = Animation.easeInOut(duration: 0.8)
    static let shimmer = Animation.easeInOut(duration: 2.0).repeatForever(autoreverses: true)
    static let pulse = Animation.easeInOut(duration: 1.5).repeatForever(autoreverses: true)
    static let float = Animation.easeInOut(duration: 3.0).repeatForever(autoreverses: true)
}

// MARK: - View Modifiers
struct MysticalCardStyle: ViewModifier {
    let isSelected: Bool
    
    func body(content: Content) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.cardGradient)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                isSelected ? Color.gold : Color.white.opacity(0.2),
                                lineWidth: isSelected ? 2 : 1
                            )
                    )
            )
            .shadow(
                color: isSelected ? .gold.opacity(0.4) : .black.opacity(0.3),
                radius: isSelected ? 15 : 8,
                x: 0,
                y: isSelected ? 8 : 4
            )
            .scaleEffect(isSelected ? 1.05 : 1.0)
            .animation(.mysticalSpring, value: isSelected)
    }
}

struct ShimmerEffect: ViewModifier {
    @State private var shimmerOffset: CGFloat = -200
    
    func body(content: Content) -> some View {
        content
            .overlay(
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [
                                .clear,
                                .white.opacity(0.3),
                                .clear
                            ],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .rotationEffect(.degrees(30))
                    .offset(x: shimmerOffset)
                    .animation(.shimmer, value: shimmerOffset)
            )
            .clipped()
            .onAppear {
                shimmerOffset = 200
            }
    }
}

struct FloatingEffect: ViewModifier {
    @State private var isFloating = false
    
    func body(content: Content) -> some View {
        content
            .offset(y: isFloating ? -10 : 10)
            .animation(.float, value: isFloating)
            .onAppear {
                isFloating.toggle()
            }
    }
}

struct PulseEffect: ViewModifier {
    @State private var isPulsing = false
    
    func body(content: Content) -> some View {
        content
            .scaleEffect(isPulsing ? 1.1 : 1.0)
            .opacity(isPulsing ? 0.8 : 1.0)
            .animation(.pulse, value: isPulsing)
            .onAppear {
                isPulsing.toggle()
            }
    }
}

// GlowEffect 已移除，統一使用 MysticalGlowEffect 以確保動畫和生命週期管理

struct MysticalBackground: ViewModifier {
    @State private var animateGradient = false
    @State private var animateStars = false
    @State private var animateNebula = false
    
    func body(content: Content) -> some View {
        ZStack {
            // Base cosmic background - 確保在最底層
            ZStack {
                // 主要星空漸變背景
                Color.cosmicGradient
                    .ignoresSafeArea(.all)
                
                // 星雲效果層
                GeometryReader { geometry in
                    // 大型星雲效果
                    ForEach(0..<8, id: \.self) { index in
                        Circle()
                            .fill(
                                RadialGradient(
                                    colors: [
                                        Color.mysticalPurple.opacity(0.3),
                                        Color.mysticalBlue.opacity(0.2),
                                        Color.clear
                                    ],
                                    center: .center,
                                    startRadius: 20,
                                    endRadius: 120
                                )
                            )
                            .frame(width: CGFloat.random(in: 100...200))
                            .position(
                                x: CGFloat.random(in: 0...geometry.size.width),
                                y: CGFloat.random(in: 0...geometry.size.height)
                            )
                            .opacity(animateNebula ? 0.8 : 0.3)
                            .animation(
                                .easeInOut(duration: Double.random(in: 4...8))
                                .repeatForever(autoreverses: true)
                                .delay(Double(index) * 0.5),
                                value: animateNebula
                            )
                    }
                }
                .ignoresSafeArea(.all)
                
                // 明亮星星層
                GeometryReader { geometry in
                    ForEach(0..<80, id: \.self) { index in
                        let starSize = CGFloat.random(in: 1...4)
                        let brightness = Double.random(in: 0.6...1.0)
                        
                        Circle()
                            .fill(Color.white.opacity(brightness))
                            .frame(width: starSize, height: starSize)
                            .position(
                                x: CGFloat.random(in: 0...geometry.size.width),
                                y: CGFloat.random(in: 0...geometry.size.height)
                            )
                            .scaleEffect(animateStars ? 1.2 : 0.8)
                            .opacity(animateStars ? 1.0 : 0.7)
                            .animation(
                                .easeInOut(duration: Double.random(in: 1.5...3.0))
                                .repeatForever(autoreverses: true)
                                .delay(Double.random(in: 0...2)),
                                value: animateStars
                            )
                    }
                }
                .ignoresSafeArea(.all)
                
                // 金色星星層（特殊亮星）
                GeometryReader { geometry in
                    ForEach(0..<15, id: \.self) { index in
                        StarShape(points: 6, innerRadius: 2, outerRadius: 6)
                            .fill(Color.gold.opacity(0.8))
                            .frame(width: 12, height: 12)
                            .position(
                                x: CGFloat.random(in: 0...geometry.size.width),
                                y: CGFloat.random(in: 0...geometry.size.height)
                            )
                            .rotationEffect(.degrees(animateStars ? 360 : 0))
                            .scaleEffect(animateStars ? 1.3 : 0.9)
                            .animation(
                                .easeInOut(duration: Double.random(in: 3...6))
                                .repeatForever(autoreverses: false)
                                .delay(Double(index) * 0.3),
                                value: animateStars
                            )
                    }
                }
                .ignoresSafeArea(.all)
                
                // 神秘光暈覆蓋層
                RadialGradient(
                    colors: [
                        .mysticalPurple.opacity(animateGradient ? 0.2 : 0.1),
                        .mysticalBlue.opacity(0.1),
                        .clear,
                        .gold.opacity(animateGradient ? 0.1 : 0.05)
                    ],
                    center: .center,
                    startRadius: 50,
                    endRadius: 500
                )
                .ignoresSafeArea(.all)
                .animation(.easeInOut(duration: 5).repeatForever(autoreverses: true), value: animateGradient)
                
                // 邊緣暈影效果
                RadialGradient(
                    colors: [
                        .clear,
                        .clear,
                        .cosmicBlack.opacity(0.3)
                    ],
                    center: .center,
                    startRadius: 200,
                    endRadius: 600
                )
                .ignoresSafeArea(.all)
            }
            .zIndex(-1) // 確保背景在最底層
            
            // 內容在上層
            content
                .zIndex(0)
        }
        .preferredColorScheme(.dark)
        .onAppear {
            withAnimation(.easeInOut(duration: 1)) {
                animateGradient = true
                animateStars = true
                animateNebula = true
            }
        }
    }
}

// MARK: - Psychedelic Nebula Background (已移除)
// PsychedelicNebulaBackground 結構體已被移除，不再需要

// MARK: - Deep Space Nebula Background
struct DeepSpaceNebulaBackground: ViewModifier {
    @State private var animateNebula1 = false
    @State private var animateNebula2 = false
    @State private var animateNebula3 = false
    @State private var animateStars = false
    @State private var animateParticles = false
    @State private var showMeteor = false
    @State private var meteorOffset: CGFloat = -100
    @State private var meteorOpacity: Double = 0
    
    // 預先生成隨機數據確保穩定性
    private let nebulaLayer1Data: [(size: CGFloat, x: CGFloat, y: CGFloat, rotation: Double)] = {
        (0..<4).map { index in
            (
                size: CGFloat.random(in: 200...300),
                x: CGFloat.random(in: 0.1...0.9),
                y: CGFloat.random(in: 0.1...0.9),
                rotation: Double(index * 90)
            )
        }
    }()
    
    private let nebulaLayer2Data: [(size: CGFloat, x: CGFloat, y: CGFloat, rotation: Double)] = {
        (0..<3).map { index in
            (
                size: CGFloat.random(in: 250...350),
                x: CGFloat.random(in: 0.15...0.85),
                y: CGFloat.random(in: 0.15...0.85),
                rotation: Double(index * 120)
            )
        }
    }()
    
    private let nebulaLayer3Data: [(size: CGFloat, x: CGFloat, y: CGFloat, rotation: Double)] = {
        (0..<2).map { index in
            (
                size: CGFloat.random(in: 300...400),
                x: CGFloat.random(in: 0.2...0.8),
                y: CGFloat.random(in: 0.2...0.8),
                rotation: Double(index * 180)
            )
        }
    }()
    
    private let starData: [(size: CGFloat, x: CGFloat, y: CGFloat, brightness: Double, flickerSpeed: Double)] = {
        (0..<200).map { _ in
            (
                size: CGFloat.random(in: 1...3),
                x: CGFloat.random(in: 0...1),
                y: CGFloat.random(in: 0...1),
                brightness: Double.random(in: 0.3...1.0),
                flickerSpeed: Double.random(in: 1.5...4.0)
            )
        }
    }()
    
    private let particleData: [(size: CGFloat, startX: CGFloat, startY: CGFloat, endX: CGFloat, endY: CGFloat, speed: Double)] = {
        (0..<30).map { _ in
            (
                size: CGFloat.random(in: 2...4),
                startX: CGFloat.random(in: 0...1),
                startY: CGFloat.random(in: 0...1),
                endX: CGFloat.random(in: 0...1),
                endY: CGFloat.random(in: 0...1),
                speed: Double.random(in: 8...15)
            )
        }
    }()
    
    func body(content: Content) -> some View {
        ZStack {
            // 深邃宇宙基底漸變
            baseGradient
            
            // 各層效果
            GeometryReader { geometry in
                ZStack {
                    // 三層星雲雲霧
                    nebulaLayer1(in: geometry)
                    nebulaLayer2(in: geometry)
                    nebulaLayer3(in: geometry)
                    
                    // 星空點綴
                    starLayer(in: geometry)
                    
                    // 金色粒子
                    particleLayer(in: geometry)
                    
                    // 流星效果
                    meteorLayer(in: geometry)
                }
            }
            .ignoresSafeArea()
            
            // 內容層
            content
        }
        .onAppear {
            startAnimations()
            startMeteorTimer()
        }
    }
    
    // MARK: - 基礎漸變
    private var baseGradient: some View {
        RadialGradient(
            colors: [
                Color(red: 0.08, green: 0.0, blue: 0.15),  // 更暗的深紫色中心
                Color(red: 0.05, green: 0.0, blue: 0.12),  // 更深的紫色
                Color(red: 0.02, green: 0.0, blue: 0.08),  // 深紫羅蘭
                Color(red: 0.0, green: 0.0, blue: 0.03)    // 接近黑色
            ],
            center: .center,
            startRadius: 50,
            endRadius: 800
        )
        .ignoresSafeArea()
    }
    
    // MARK: - 星雲層1 (120秒旋轉週期)
    private func nebulaLayer1(in geometry: GeometryProxy) -> some View {
        ForEach(Array(nebulaLayer1Data.enumerated()), id: \.offset) { index, data in
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.3, green: 0.1, blue: 0.5).opacity(0.25),  // 更暗的半透明紫色
                            Color(red: 0.2, green: 0.05, blue: 0.35).opacity(0.2),
                            Color(red: 0.1, green: 0.0, blue: 0.25).opacity(0.15),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: data.size * 0.5
                    )
                )
                .frame(width: data.size, height: data.size)
                .position(
                    x: geometry.size.width * data.x,
                    y: geometry.size.height * data.y
                )
                .rotationEffect(.degrees(animateNebula1 ? data.rotation + 360 : data.rotation))
                .blur(radius: 8)
                .animation(
                    .linear(duration: 120)
                    .repeatForever(autoreverses: false),
                    value: animateNebula1
                )
        }
    }
    
    // MARK: - 星雲層2 (150秒旋轉週期)
    private func nebulaLayer2(in geometry: GeometryProxy) -> some View {
        ForEach(Array(nebulaLayer2Data.enumerated()), id: \.offset) { index, data in
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.2, green: 0.3, blue: 0.7).opacity(0.35), // 半透明靛藍色
                            Color(red: 0.1, green: 0.2, blue: 0.5).opacity(0.25),
                            Color(red: 0.05, green: 0.1, blue: 0.3).opacity(0.15),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: data.size * 0.6
                    )
                )
                .frame(width: data.size, height: data.size)
                .position(
                    x: geometry.size.width * data.x,
                    y: geometry.size.height * data.y
                )
                .rotationEffect(.degrees(animateNebula2 ? data.rotation - 360 : data.rotation))
                .blur(radius: 12)
                .animation(
                    .linear(duration: 150)
                    .repeatForever(autoreverses: false),
                    value: animateNebula2
                )
        }
    }
    
    // MARK: - 星雲層3 (180秒旋轉週期)
    private func nebulaLayer3(in geometry: GeometryProxy) -> some View {
        ForEach(Array(nebulaLayer3Data.enumerated()), id: \.offset) { index, data in
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.2, green: 0.0, blue: 0.35).opacity(0.2), // 更暗的半透明深紫羅蘭色
                            Color(red: 0.15, green: 0.0, blue: 0.25).opacity(0.15),
                            Color(red: 0.1, green: 0.0, blue: 0.18).opacity(0.08),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: data.size * 0.7
                    )
                )
                .frame(width: data.size, height: data.size)
                .position(
                    x: geometry.size.width * data.x,
                    y: geometry.size.height * data.y
                )
                .rotationEffect(.degrees(animateNebula3 ? data.rotation + 360 : data.rotation))
                .blur(radius: 15)
                .animation(
                    .linear(duration: 180)
                    .repeatForever(autoreverses: false),
                    value: animateNebula3
                )
        }
    }
    
    // MARK: - 星空層
    private func starLayer(in geometry: GeometryProxy) -> some View {
        ForEach(Array(starData.enumerated()), id: \.offset) { index, data in
            Circle()
                .fill(Color.white.opacity(data.brightness))
                .frame(width: data.size, height: data.size)
                .position(
                    x: geometry.size.width * data.x,
                    y: geometry.size.height * data.y
                )
                .scaleEffect(animateStars ? 1.2 : 0.8)
                .opacity(animateStars ? 1.0 : 0.6)
                .animation(
                    .easeInOut(duration: data.flickerSpeed)
                    .repeatForever(autoreverses: true)
                    .delay(Double.random(in: 0...2)),
                    value: animateStars
                )
        }
    }
    
    // MARK: - 金色粒子層
    private func particleLayer(in geometry: GeometryProxy) -> some View {
        ForEach(Array(particleData.enumerated()), id: \.offset) { index, data in
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.8), // 金色中心
                            Color(red: 1.0, green: 0.92, blue: 0.4).opacity(0.6), // 淺金色
                            Color(red: 1.0, green: 0.84, blue: 0.0).opacity(0.3),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: data.size
                    )
                )
                .frame(width: data.size, height: data.size)
                .position(
                    x: geometry.size.width * (animateParticles ? data.endX : data.startX),
                    y: geometry.size.height * (animateParticles ? data.endY : data.startY)
                )
                .blur(radius: 1)
                .animation(
                    .easeInOut(duration: data.speed)
                    .repeatForever(autoreverses: true)
                    .delay(Double(index) * 0.2),
                    value: animateParticles
                )
        }
    }
    
    // MARK: - 流星層
    private func meteorLayer(in geometry: GeometryProxy) -> some View {
        Rectangle()
            .fill(
                LinearGradient(
                    colors: [
                        Color.white.opacity(meteorOpacity),
                        Color.white.opacity(meteorOpacity * 0.8),
                        Color.white.opacity(meteorOpacity * 0.5),
                        Color.white.opacity(meteorOpacity * 0.2),
                        Color.clear
                    ],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .frame(width: 80, height: 2)
            .position(
                x: meteorOffset,
                y: geometry.size.height * 0.3
            )
            .rotationEffect(.degrees(45))
            .blur(radius: 0.5)
    }
    
    // MARK: - 動畫控制
    private func startAnimations() {
        withAnimation {
            animateNebula1 = true
            animateNebula2 = true
            animateNebula3 = true
            animateStars = true
            animateParticles = true
        }
    }
    
    private func startMeteorTimer() {
        Timer.scheduledTimer(withTimeInterval: 3.0, repeats: true) { _ in
            animateMeteor()
        }
    }
    
    private func animateMeteor() {
        // 重置流星位置
        meteorOffset = -100
        meteorOpacity = 0
        
        // 流星劃過動畫
        withAnimation(.easeIn(duration: 0.1)) {
            meteorOpacity = 1.0
        }
        
        withAnimation(.easeOut(duration: 1.5)) {
            meteorOffset = 500 // 使用固定值代替 UIScreen.main.bounds.width
        }
        
        // 流星消失
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.2) {
            withAnimation(.easeOut(duration: 0.3)) {
                meteorOpacity = 0
            }
        }
    }
}

// MARK: - View Extensions
extension View {
    func mysticalCardStyle(isSelected: Bool = false) -> some View {
        modifier(MysticalCardStyle(isSelected: isSelected))
    }
    
    func shimmerEffect() -> some View {
        modifier(ShimmerEffect())
    }
    
    func floatingEffect() -> some View {
        modifier(FloatingEffect())
    }
    
    func pulseEffect() -> some View {
        modifier(PulseEffect())
    }
    
    func glowEffect(color: Color = .gold, radius: CGFloat = 10) -> some View {
        self.modifier(MysticalGlowEffect(color: color, radius: radius, intensity: 0.6))
    }
    
    func mysticalBackground() -> some View {
        self.modifier(MysticalBackground())
    }
    
    // (REMOVED psychedelicNebulaBackground - no longer needed)
    
    func deepSpaceNebulaBackground() -> some View {
        self.modifier(DeepSpaceNebulaBackground())
    }
}

// MARK: - Custom Shapes
struct MysticalCard: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let cornerRadius: CGFloat = 16
        
        path.addRoundedRect(in: rect, cornerSize: CGSize(width: cornerRadius, height: cornerRadius))
        
        return path
    }
}

struct StarShape: Shape {
    let points: Int
    let innerRadius: CGFloat
    let outerRadius: CGFloat
    
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.width / 2, y: rect.height / 2)
        let angleIncrement = .pi * 2 / CGFloat(points * 2)
        
        for i in 0..<(points * 2) {
            let angle = angleIncrement * CGFloat(i) - .pi / 2
            let radius = i.isMultiple(of: 2) ? outerRadius : innerRadius
            let x = center.x + cos(angle) * radius
            let y = center.y + sin(angle) * radius
            
            if i == 0 {
                path.move(to: CGPoint(x: x, y: y))
            } else {
                path.addLine(to: CGPoint(x: x, y: y))
            }
        }
        
        path.closeSubpath()
        return path
    }
}

// MARK: - Custom Buttons
struct MysticalButton: View {
    let title: String
    let icon: String?
    let action: () -> Void
    let style: MysticalButtonStyle
    
    enum MysticalButtonStyle {
        case primary
        case secondary
        case gold
    }
    
    init(_ title: String, icon: String? = nil, style: MysticalButtonStyle = .primary, action: @escaping () -> Void) {
        self.title = title
        self.icon = icon
        self.style = style
        self.action = action
    }
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.headline)
                }
                
                Text(title)
                    .font(.headline)
                    .fontWeight(.semibold)
            }
            .foregroundColor(foregroundColor)
            .padding(.vertical, 16)
            .padding(.horizontal, 24)
            .background(backgroundGradient)
            .cornerRadius(25)
            .overlay(
                RoundedRectangle(cornerRadius: 25)
                    .stroke(borderColor, lineWidth: 1)
            )
            .shadow(color: shadowColor, radius: 15, x: 0, y: 8)
        }
        .scaleEffect(1.0)
        .animation(.mysticalSpring, value: false)
    }
    
    private var foregroundColor: Color {
        switch style {
        case .primary: return .white
        case .secondary: return .mysticalPurple
        case .gold: return .black
        }
    }
    
    private var backgroundGradient: LinearGradient {
        switch style {
        case .primary: return Color.primaryGradient
        case .secondary: return LinearGradient(colors: [.white.opacity(0.1), .white.opacity(0.05)], startPoint: .top, endPoint: .bottom)
        case .gold: return Color.goldGradient
        }
    }
    
    private var borderColor: Color {
        switch style {
        case .primary: return .mysticalPurple.opacity(0.5)
        case .secondary: return .white.opacity(0.3)
        case .gold: return .gold.opacity(0.5)
        }
    }
    
    private var shadowColor: Color {
        switch style {
        case .primary: return .mysticalPurple.opacity(0.4)
        case .secondary: return .black.opacity(0.2)
        case .gold: return .gold.opacity(0.4)
        }
    }
}

#Preview {
    VStack(spacing: 20) {
        MysticalButton("Primary Button", icon: "star.fill", style: .primary) {}
        MysticalButton("Secondary Button", style: .secondary) {}
        MysticalButton("Gold Button", icon: "crown.fill", style: .gold) {}
        
        RoundedRectangle(cornerRadius: 16)
            .fill(Color.cardGradient)
            .frame(width: 200, height: 100)
            .mysticalCardStyle(isSelected: true)
            .shimmerEffect()
    }
    .padding()
    .mysticalBackground()
}

