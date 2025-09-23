//
//  Item.swift
//  SoulCards
//
//  Created by Andy Leung on 23/9/2025.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
