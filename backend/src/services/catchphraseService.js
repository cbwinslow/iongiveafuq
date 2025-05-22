class CatchphraseService {
  constructor() {
    this.catchphrases = {
      charmz: [
        "I don't give a damn about your problems, darling",
        "Your issues? More like your drama queen moments",
        "I've got better things to do than care about your petty concerns",
        "My charm is my superpower, your problems are just noise",
        "When I say 'I don't give a damn', I mean it, sweetie",
        "I don't give a damn about your attempts to impress me",
        "Your efforts? More like your desperate attempts at attention",
        "I've got better things to do than listen to your pathetic attempts",
        "My style is my statement, your attempts are just noise",
        "When I say 'I don't give a damn', I mean it, gentlemen...",
        "Your competition? More like your pathetic attempts at relevance",
        "I don't give a damn about your attempts to outshine me",
        "Your efforts? More like your desperate attempts at relevance",
        "I've got better things to do than listen to your whining",
        "My presence is my power, your attempts are just noise",
        "When I say 'I don't give a damn', I mean it, boys..."
      ],
      scrapz: [
        "I don't give a single fuck about your problems",
        "Your issues? More like your f*ck-ups",
        "Another day, another fuq to not give",
        "I've got better things to do than care about your drama"
      ],
      dumbo: [
        "I'm too busy being ugly to give a damn",
        "My ugliness is my superpower, your problems are not",
        "I don't give a damn about what you think",
        "My ugliness is my art form, your problems are just noise"
      ],
      patty: [
        "I don't give a damn about your boring life",
        "Your problems? More like your boring monologues",
        "I've got better things to do than listen to your whining",
        "My fabulousness doesn't need your problems"
      ],
      buzz: [
        "I'm too drunk to give a damn",
        "Your problems? More like your buzz-killers",
        "I've got better things to do than care about your sobriety",
        "My hangover is more important than your issues"
      ],
      rizzo: [
        "I'm too sick to give a damn",
        "Your problems? More like your contagious nonsense",
        "I've got better things to do than care about your health",
        "My sickness is my superpower, your problems are just germs"
      ]
    };
      scrapz: [
        "I don't give a single fuck about your problems",
        "Your issues? More like your f*ck-ups",
        "Another day, another fuq to not give",
        "I've got better things to do than care about your drama"
      ],
      dumbo: [
        "I'm too busy being ugly to give a damn",
        "My ugliness is my superpower, your problems are not",
        "I don't give a damn about what you think",
        "My ugliness is my art form, your problems are just noise"
      ],
      patty: [
        "I don't give a damn about your boring life",
        "Your problems? More like your boring monologues",
        "I've got better things to do than listen to your whining",
        "My fabulousness doesn't need your problems"
      ],
      buzz: [
        "I'm too drunk to give a damn",
        "Your problems? More like your buzz-killers",
        "I've got better things to do than care about your sobriety",
        "My hangover is more important than your issues"
      ],
      rizzo: [
        "I'm too sick to give a damn",
        "Your problems? More like your contagious nonsense",
        "I've got better things to do than care about your health",
        "My sickness is my superpower, your problems are just germs"
      ]
    };
  }

  getRandomCatchphrase(characterId) {
    if (!this.catchphrases[characterId]) {
      throw new Error(`No catchphrases found for character: ${characterId}`);
    }
    return this.catchphrases[characterId][
      Math.floor(Math.random() * this.catchphrases[characterId].length)
    ];
  }

  getAllCatchphrases(characterId) {
    return this.catchphrases[characterId] || [];
  }
}

module.exports = new CatchphraseService();
