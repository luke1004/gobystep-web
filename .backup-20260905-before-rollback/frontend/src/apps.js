// 每个 App 只需要填写 name、path 和 sections。
// 每组内容只需要填写 photo、title、text。
export const apps = [
  {
    name: 'Say It Out',
    path: '/fm',
    sections: [
      { title: 'Learn sentence by sentence', items: [
        { photo: 'SayItOut9.png', title: 'Listen to the sentence', text: 'The current sentence stays at the center of the lesson, so you can listen carefully before trying to say it yourself.' },
        { photo: 'addTrack.png', title: 'Bring your own audio', text: 'Start with an audio file you already have and turn it into a sequence of small, repeatable practice units.' }
      ] },
      { title: 'Practice and check', items: [
        { photo: 'learning.png', title: 'Repeat at your own pace', text: 'Pause, replay, and return to difficult sentences as many times as needed without losing the flow of the lesson.' },
        { photo: 'eSayItOut.png', title: 'Say it out and compare', text: 'Speak the sentence yourself, check the result, and build confidence one short sentence at a time.' },
        { photo: 'cx.mov', title: 'Practice demonstration', text: 'This video shows the rhythm of listening, repeating, and moving through a lesson sentence by sentence.', type: 'video' }
      ] }
    ]
  },
  {
    name: 'eQuicker24',
    path: '/eQuicker24',
    sections: [
      { title: 'A simple family challenge', items: [
        { photo: 'weq1.PNG', title: 'Start with four cards', text: 'Each round begins with four randomly selected cards and one clear goal: reach the number 24.' },
        { photo: 'weq2.PNG', title: 'Look for a route', text: 'Try different combinations and use each card once while the other players search for their answer.' }
      ] },
      { title: 'Think quickly and keep score', items: [
        { photo: 'weq3.PNG', title: 'Use basic arithmetic', text: 'Add, subtract, multiply, or divide the cards to find an exact solution.' },
        { photo: 'weq4.PNG', title: 'Win the round', text: 'The first player with a correct answer receives the point, and the next set of cards begins.' },
        { photo: 'weq5.PNG', title: 'Play to the end', text: 'Continue until the deck is exhausted and compare the final scores.' }
      ] }
    ]
  },
  {
    name: 'ShowAce',
    path: '/showace',
    sections: [
      { title: 'Turn an album into a story', items: [
        { photo: 'showbest1.jpg', title: 'See memories full screen', text: 'Let photos and videos play one by one with the time and place they were captured.' },
        { photo: 'showbest2.jpg', title: 'Make the presentation personal', text: 'Choose the moments you want to highlight and add a frame that fits the feeling of the album.' }
      ] },
      { title: 'Keep the originals safe', items: [
        { photo: 'showbest.png', title: 'Control what is shown', text: 'Hide items you do not want to include, adjust the presentation, and keep the original media unchanged.' },
        { photo: 'cx.mov', title: 'Press play and enjoy', text: 'Use the background music and playback controls to create a calm, continuous viewing experience.', type: 'video' }
      ] }
    ]
  }
];
