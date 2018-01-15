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
    getElement(attackerInput).style = "display: none";
    getElement(defenderInput).style = "display: none";
}

// Shows the scores obtained from 'losses' to the attackerScoreElement and defenderScoreElement
function showScores(attackerScoreElement, defenderScoreElement, losses) {
    var attackerElement = getElement(attackerScoreElement);
    var defenderElement = getElement(defenderScoreElement);

    attackerElement.style = "display: block";
    defenderElement.style = "display: block";

    console.log(losses);

    // If the attacker was the winner...
    if (losses[0] <= losses[1]) {
        attackerElement.innerHTML = "<h2 class='text-center'>ATTACKERS WIN</h2>" +
            "<h4 class='text-center text-muted'>(Took " + losses[0] + " casualties.)</h4>";

        getElement('first').style = "background-color: green";
        getElement('second').style = "background-color: red";
    } else {
        defenderElement.innerHTML = "<h2 class='text-center'>DEFENDERS WIN</h2>" +
          "<h4 class='text-center text-muted'>(Took " + losses[1] + " casualties.)</h4>";

        getElement('first').style = "background-color: red";
        getElement('second').style = "background-color: green";
    }

    // Set the button to active the restart function and change its text to Reset
    getElement('battle').setAttribute('onclick', 'restart()');
    getElement('battle').innerHTML = 'RESET';

    // getElement(attackerScoreElement).style = "width: " + window.innerWidth;
}

function calculateWinner() {
    // If there are validation errors in the fields, don't do anything
    // and report them to the user
    if (!document.getElementById('attackers').reportValidity() || !document.getElementById('defenders').reportValidity()) {
        return;
    }

    var attackers = parseInt(document.getElementById("attackers").value), originalAttackers = attackers;
    var defenders = parseInt(document.getElementById("defenders").value), originalDefenders = defenders;

    while (attackers > 1 && defenders > 0) {
      var attackersDice = generateRandomDice(attackers-1);
      var defendersDice = generateRandomDice(defenders);

      var losses = determineLosses(attackersDice, defendersDice);

      attackers += parseInt(losses[0]);
      defenders += parseInt(losses[1]);
    }

    hideInput('attackerInput', 'defenderInput');
    showScores('attackerScore', 'defenderScore', [-1*(attackers-originalAttackers), -1*(defenders-originalDefenders)]);
}

// Retrieves an element by its class name
function getElement(className) {
    return document.getElementsByClassName(className)[0];
}

function restart() {
    getElement('attackerInput').style = "display: block";
    getElement('defenderInput').style = "display: block";

    getElement('attackerScore').style = "display: none";
    getElement('attackerScore').innerHTML = '';
    getElement('defenderScore').style = "display: none";
    getElement('defenderScore').innerHTML = '';

    getElement('battle').setAttribute('onclick', 'calculateWinner()');
    getElement('battle').innerHTML = 'BATTLE';

    getElement('first').style = "background-color: none";
    getElement('second').style = "background-color: none";
}