let vThis = new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      let damage = this.calcDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage,
      });
      if(this.checkWin()) return;
      this.monsterFightsBack();
    },
    specialAttack() {
      let damage = this.calcDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster HARD for ' + damage,
      });
      if(this.checkWin()) return;
      this.monsterFightsBack();
    },
    heal() {    // Heals by 10 or up to 100
      let healAmt = this.playerHealth <= 90 ? 10 : 100 - this.playerHealth;
      this.playerHealth += healAmt;
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for ${healAmt}`,
      });
      this.monsterFightsBack();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    calcDamage(min, max) {    // Calculate random damage between 'min' and 'max'
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if(this.monsterHealth <= 0) {
        this.monsterHealth = 0;   // Set to 0 for proper css display
        if(confirm('You won! New game?')) this.startGame();
        else this.gameIsRunning = false;
        return true;
      } else if(this.playerHealth <= 0) {
        this.playerHealth = 0;    // Set to 0 for proper css display
        if(confirm('You lost! New game?')) this.startGame();
        else this.gameIsRunning = false;
        return true;
      }
      return false;
    },
    monsterFightsBack() {
      let damage = this.calcDamage(4, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage,
      });
      this.checkWin();
    },
  },
});
