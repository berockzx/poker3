let myAddress = null;
let sessionId = null;
let players = [];
let hasDeposited = false;
const ENTRY_FEE = 100;
const PAYOUT = 180;
const DEPOSIT_ADDR = "59rxvLjmDzXG7bXTKJ2SgbLvV4p7hdBZ8xxCDhhKqGtVggCrzTWiGP4CmhyqFcBb3";

function log(msg) {
    document.getElementById("game-log").innerHTML += msg + "<br>";
}

function startGame() {
    if (!hasDeposited) {
        log("Please deposit " + ENTRY_FEE + " IXI to play.");
        return;
    }
    log("Waiting for other player...");
    SpixiAppSdk.sendNetworkData("ready");
}

SpixiAppSdk.onInit = function(sid, userAddresses) {
    sessionId = sid;
    players = userAddresses;
    myAddress = userAddresses[0];
    log("Session started.");
    log("Send " + ENTRY_FEE + " IXI to: " + DEPOSIT_ADDR);
    log("After payment, click Start Game.");
};

SpixiAppSdk.onNetworkData = function(sender, data) {
    log("Message from " + sender + ": " + data);
    if (data === "ready" && hasDeposited) {
        log("Game started!");
        let winner = players[Math.floor(Math.random() * players.length)];
        log("Winner: " + winner);
        if (myAddress === winner) {
            SpixiAppSdk.spixiAction("sendixi:" + PAYOUT + ":" + myAddress);
            log("You win! Sent " + PAYOUT + " IXI to yourself.");
        }
    }
};