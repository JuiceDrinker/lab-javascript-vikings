// Soldier
function Soldier(health, strength) {
    this.health = health;
    this.strength = strength;
}

Soldier.prototype.attack = function () {
    return this.strength;
}
Soldier.prototype.receiveDamage = function (damage) {
    this.health -= damage;
}

// Viking
function Viking(name, health, strength) {
    Soldier.call(this, health, strength)
    this.name = name;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
    this.health -= damage;

    console.log(this.name);
    if (this.health > 0) {
        return `${this.name} has received ${damage} points of damage`
    }
    else {
        return `${this.name} has died in act of combat`
    }
}

Viking.prototype.battleCry = function () {
    return "Odin Owns You All!"
}



// Saxon
function Saxon(health, strength) {
    Soldier.call(this, health, strength);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damage) {
    this.health -= damage;
    if (this.health > 0) {
        return `A Saxon has received ${damage} points of damage`
    }
    else {
        return 'A Saxon has died in combat'
    }
}


function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];
};

War.prototype.addViking = function (viking) {
    this.vikingArmy.push(viking);
};
War.prototype.addSaxon = function (saxon) {
    this.saxonArmy.push(saxon);
};

War.prototype.vikingAttack = function () {
    const randomV = Math.floor(Math.random() * this.vikingArmy.length)
    const randomS = Math.floor(Math.random() * this.saxonArmy.length)
    const viking = this.vikingArmy[randomV]
    const saxon = this.saxonArmy[randomS]
    const result = saxon.receiveDamage(viking.strength)
    this.saxonArmy.forEach((e, i) => { //Remove all dead Saxons
        if (e.health <= 0) {
            this.saxonArmy.splice(i, 1)
        }
    })
    return result;
}

War.prototype.saxonAttack = function () {
    const randomV = Math.floor(Math.random() * this.vikingArmy.length)
    const randomS = Math.floor(Math.random() * this.saxonArmy.length)
    const viking = this.vikingArmy[randomV]
    const saxon = this.saxonArmy[randomS]
    const result = viking.receiveDamage(saxon.strength)
    this.vikingArmy.forEach((e, i) => {
        if (e.health <= 0) {
            this.vikingArmy.splice(i, 1)
        }
    })
    return result;
}
War.prototype.showStatus = function () {
    if (this.saxonArmy.length === 0){
        return `Vikings have won the war of the century!`
    }

    if (this.vikingArmy.length === 0){
        return `Saxons have fought for their lives and survive another day...`
    }

    else{
        return `Vikings and Saxons are still in the thick of battle.`
    }
}