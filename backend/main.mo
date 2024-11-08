import Timer "mo:base/Timer";
import Random "mo:base/Random";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";

actor {
    // Stable storage for sessions
    stable var totalSessions : Nat = 0;
    stable var totalFocusTime : Nat = 0;

    // Productivity quotes
    let quotes : [Text] = [
        "The only way to do great work is to love what you do.",
        "Focus on being productive instead of busy.",
        "Do the hard jobs first. The easy jobs will take care of themselves.",
        "Until we can manage time, we can manage nothing else.",
        "Action is the foundational key to all success."
    ];

    // Productivity tips
    let tips : [Text] = [
        "Take regular breaks to maintain focus",
        "Use the two-minute rule: if it takes less than two minutes, do it now",
        "Break large tasks into smaller, manageable chunks",
        "Eliminate distractions before starting work",
        "Set clear goals for each work session"
    ];

    // Get random quote
    public func getRandomQuote() : async Text {
        let seed = Int.abs(Time.now());
        let randomIndex = seed % quotes.size();
        quotes[randomIndex]
    };

    // Get random tip
    public func getRandomTip() : async Text {
        let seed = Int.abs(Time.now());
        let randomIndex = seed % tips.size();
        tips[randomIndex]
    };

    // Record completed session
    public func recordSession(duration: Nat) : async () {
        totalSessions += 1;
        totalFocusTime += duration;
    };

    // Get session stats
    public query func getStats() : async (Nat, Nat) {
        (totalSessions, totalFocusTime)
    };

    // Generate random color
    public func getRandomColor() : async Text {
        let seed = Int.abs(Time.now());
        let colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];
        colors[seed % colors.size()]
    };
}
