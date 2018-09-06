



export let initialState = {
  currentUser:{},
  users:[
    {
      id:1,
      name: {
        title: "mr",
        first: "Palaye",
        last: "SOW"
      },
      email: "palaye.sow@example.com",
      login: {
        username: "palaye",
        password: "palaye",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/29.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/29.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/29.jpg"
      },
      nat: "SN"
    },
    {
      id:2,
      name: {
        title: "mr",
        first: "Doudou Sarr",
        last: "NIANG"
      },
      email: "doudou-sarr.niang@example.com",
      login: {
        username: "DoudouSN",
        password: "DoudouSN",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/30.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/30.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/30.jpg"
      },
      nat: "SN"
    },
    {
      id:3,
      name: {
        title: "mr",
        first: "Bira",
        last: "DIOP"
      },
      email: "bira.diop@example.com",
      login: {
        username: "bira",
        password: "password",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/31.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/31.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/31.jpg"
      },
      nat: "SN"
    },

  ],
  sondages:[
    {
    key:1,
    title:"Lundi 02 Avril 2018",
    question : "Peut-on interdire les voitures en ville ?",
    answer:"none",
    nbAnswers:15,
    nbYes:7,
    nbNo:8,
   },
   {
    key:2,
    title: "Dimanche 01 Avril 2018",
    question : "La mécanique des médias est-elle devenue le premier juge ?",
    nbAnswers:10,
    nbYes:2,
    nbNo:8,
    answer: "oui",
   },
   {
    key:3,
    title: "Vendredi 30 Mars 2018",
    question : "50 ans après la mort de Martin Luther King, sommes-nous toujours en train de nous battre pour des libertés raciales ?",
    nbAnswers:10,
    nbYes:4,
    nbNo:6,
    answer: "none",
   },
   {
    key:4,
    title: "Jeudi 29 Mars 2018",
    question : "L'arabie saoudite peut elle jouer un rôle clé pour la paix entre Israel et la Palestine ?",
    nbAnswers:10,
    nbYes:5,
    nbNo:5,
    answer: "oui",
   },
   {
    key:5,
    title: "Mercredi 28 Mars 2018",
    question : "Etes vous favorale à l'autorisation de la vente de la Tour Eiffel au Qatar ?",
    nbAnswers:10,
    nbYes:2,
    nbNo:8,
    answer: "none",
   },
   {
    key:6,
    title: "Mardi 27 Mars 2018",
    question : "La grogne des étudiants peut elle se propager à toute la société ?",
    nbAnswers:10,
    nbYes:3,
    nbNo:7,
    answer: "non",
   },
  ],
  comments:[
    {
      key:1,
      sondageKey:1,
      text:"Non je ne penses pas",
      date:"03-04-2018 12:00",
      user:"palaye",
      picture:"https://randomuser.me/api/portraits/men/55.jpg",
      nbThumbsUp:20,
      nbThumbsDown:11,
      answer:"non",
      flag:false, 
      userThumbsUp:false,
      userThumbsDown:false,
    },
    {
      key:2,
      sondageKey:1,
      text:"bonne question",
      date:"05-04-2018 12:00",
      user:"bira",
      picture:"https://randomuser.me/api/portraits/men/63.jpg",
      nbThumbsUp:14,
      nbThumbsDown:6,
      answer:"oui",
      flag:false, 
      userThumbsUp:false,
      userThumbsDown:false,
    },
    {
      key:3,
      sondageKey:2,
      text:"Non je ne penses pas",
      date:"01-04-2018 12:00",
      user:"ibrahima",
      picture:"https://randomuser.me/api/portraits/men/55.jpg",
      nbThumbsUp:20,
      nbThumbsDown:11,
      answer:"non",
      flag:false,  
      userThumbsUp:false,
      userThumbsDown:false,
    },
    {
      key:4,
      sondageKey:3,
      text:"Non je ne penses pas",
      date:"30-03-2018 12:00",
      user:"marieme",
      picture:"https://randomuser.me/api/portraits/women/30.jpg",
      nbThumbsUp:2,
      nbThumbsDown:1,
      answer:"non",
      flag:false, 
      userThumbsUp:false,
      userThumbsDown:false,
    },
    {
      key:5,
      sondageKey:4,
      text:"C'est sur",
      date:"29-03-2018 12:00",
      user:"toto",
      picture:"https://randomuser.me/api/portraits/men/53.jpg",
      nbThumbsUp:24,
      nbThumbsDown:16,
      answer:"non",
      flag:false,  
      userThumbsUp:false,
      userThumbsDown:false,
    },
    {
      key:6,
      sondageKey:6,
      text:"Non je ne penses pas",
      date:"27-03-2018 12:00",
      user:"ladyFrench",
      picture:"https://randomuser.me/api/portraits/women/92.jpg",
      nbThumbsUp:20,
      nbThumbsDown:11,
      answer:"non",
      flag:false,  
      userThumbsUp:false,
      userThumbsDown:false,
    },
  ],
  commentResponses:[
    {
      key:1,
      commentKey:1,
      text:"Pourquoi .. je ne suis pas d'accord",
      date:"04-04-2018 12:00",
      user:"caty",
      picture:"https://randomuser.me/api/portraits/thumb/women/30.jpg",
      answer:"oui",
      nbThumbsUp:2,
      nbThumbsDown:3,     
      userThumbsUp:false,
      userThumbsDown:false,
      flag:false, 
    },
  ]

}



