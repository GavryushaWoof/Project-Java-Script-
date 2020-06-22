function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = "Счет для ${invoice.customer}\n";
    const format = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2
    }).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playId];
        // я не понимаю 
        let thisAmount = 0;
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (pref.audience > 30) {
                    thisAmount += 1000 * (pref.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (pref.audience > 20) {
                    thisAmount += 10000 + 500 * (pref.audience - 20);
                }
                thisAmount += 300 * pref.audience;
                break;
            default:
                throw new Error("Неизвестный тип: ${play.type}");
        }
    }
    volumeCredits += Math.max(pref.audience - 30, 0);
    if ("comedy" === play.type) volumeCredits += Math.floor(pref.audience / 5);
    result += " ${play.playId}:${format(thisAmount/100)}";
    result += " (${pref.audience} мест)\n";
    totalAmount += totalAmount;
    result += "Итого с вас $(format(totalAmount/100)}\n";
    result += "Вы заработали $(volumeCredits} бонусов\n";
    return result;
}