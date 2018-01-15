// In order for the ATTACKER to successfully begin an attack on a DEFENDER'S territory,
// they must have at least TWO units available.

// Each player rolls the amount of dice corresponding to the amount of troops they own, however
// the ATTACKER can roll up to THREE dice, while the DEFENDER can roll up to two

// NOTE: The ATTACKER rolls the amount of troops they own up to THREE based on the amount of troops
//       they own minus one. Eg. if they ATTACK a territory while having THREE troops in total, the
//       attack will only be conducted with TWO troops. This does not apply to DEFENDERS.

// When the attack initiates, both the ATTACKER and DEFENDER roll their respective amount of dice (see above).
// The dice are then compared from highest to lowest
// Eg. If the ATTACKER rolls 3, 2, and 5, their dice would be ordered 5, 3, 2
// This ordering is then compared to the DEFENDER'S dice, which are ordered in the same manner
// A troop dies based on whichever dice is higher in a pair

// Eg. if the ATTACKER rolls 3, 2, and 5, and the DEFENDER rolls a 2, 6, the pairs would look as follows

// 5: 6
// 3: 2

// Therefore, the ATTACKER loses out in the first pair and loses a troop. The DEFENDER loses out in the second
// pair and therefore loses one of their troops.
// If the pair is tied, then the DEFENDER wins. Hence, if the DEFENDER rolls a SIX it is an automatic victory

// This continues until either the ATTACKER is left with ONE troop or ALL of the DEFENDER'S troops are gone, in
// which the ATTACKER will have successfully captured the territory.

function generateRandomDice(amountOfDice) {
    // Return an ORDERED set of randomly generated dice throws in ascension
    
    var generatedDice = [];
    
    for ( var i = 1; i <= amountOfDice; i++ ) {
        generatedDice[i-1] = Math.floor(Math.random() * 6) + 1;
    }
    
    return generatedDice.sort(function(a, b) { b - a });
}

function determineLosses(attackersDice, defendersDice) {
    // Return an array of type [attackers lost, defenders lost]
    // defaults at [0, 0]
    
    // attackersDice and defendersDice must be in the format [(dice rolled...)] eg. [3, 2, 6]
    // and be sorted in ascending order
    
    var totalLost = [0, 0];
    
    for ( var i = 0; i < attackersDice.length && i < defendersDice.length; i++ ) {
        // If the attackers got a higher dice roll in the current pair, then the defenders
        // lose a point
        if (attackersDice[i] > defendersDice[i]) {
            totalLost[1]--;
        } else {
            totalLost[0]--
        }
    }
    
    return totalLost;
}

// Hides the classes 'attackerInput' and 'defenderInput'
function hideInput(attackerInput, defenderInput) {
    document.getElementsByClassName(attackerInput)[0].style = "none";
    document.getElementsByClassName(defenderInput)[0].style = "none";
}

// Shows the scores obtained from 'losses' to the attackerScoreElement and defenderScoreElement
function showScores(attackerScoreElement, defenderScoreElement, losses) {
    document.getElementsByClassName(attackerScoreElement)[0].style = "block";
    document.getElementsByClassName(defenderScoreElement)[0].style = "block";
    
    document.getElementsByClassName(attackerScoreElement)[0].innerHTML = losses[0];
    document.getElementsByClassName(defenderScoreElement)[0].innerHTML = losses[1];
}

function calculateWinner() {
    var attackers = document.getElementById("attackers").value;
    var defenders = document.getElementById("defenders").value;
    
    var attackersDice = generateRandomDice(attackers-1);
    var defendersDice = generateRandomDice(defenders);
    
    var losses = determineLosses(attackersDice, defendersDice);
    
    attackers -= losses[0];
    defenders -= losses[1];
    
    hideInput('attackerInput', 'defenderInput');
    showScores('attackerScore', 'defenderScore', [attackers, defenders])
}