
//   ====================== Search Bar =============================//
let searchable = [];

const searchInput = document.getElementById('search')
const searchWrapper = document.querySelector('.wrapper')
const resultsWrapper = document.querySelector('.results')
const regex = /[,{}\[\]""]/g;
let monsterStatsArray = [];
const monsterStatsWrapper = document.getElementById('monster-stats-wrapper');
const newMonsterDiv = document.querySelector('#new-monster-wrapper');
const mashButton = document.querySelector('#mash-button');


searchInput.addEventListener('keyup', async (e) => {
  let input = searchInput.value;
  if (input.length >= 2) {
    const response = await fetch(`https://www.dnd5eapi.co/api/monsters/?name=${input}`);
    const data = await response.json();
    const results = data.results.map((item) => ({
        name: item.name,
        url:`https://www.dnd5eapi.co/api/monsters/${item.index}`,
    }));
    renderResults(results);
  } else {
    renderResults([]);
  }
});

function renderResults(results) {
    if (!results.length) {
        if (searchWrapper === null) {
            console.log('searchWrapper is null');
            return;
        }
        
    }

    let content = results.map((item) => {
        return `<li data-url="${item.url}">
            <div> 
                <p>${item.name}
            </div>
        </li>`
    }).join('')
    
    searchWrapper.classList.add('show')
    resultsWrapper.innerHTML = `<ul>${content}</ul>`;

// ============== New Stat Block ============ //
const listItems = document.querySelectorAll('li');

listItems.forEach((item) => {
    item.addEventListener('click', async () => {
        const monsterUrl = item.dataset.url;
        const monsterResponse = await fetch(monsterUrl);
        const monsterData = await monsterResponse.json();
        searchInput.value = '';
        searchWrapper.classList.remove('show');
        const monsterStats = {
          name: monsterData.name,
          type: monsterData.type,
          challenge_rating: monsterData.challenge_rating,
          hit_points: monsterData.hit_points,
          armor_class: monsterData.armor_class,
          speed: monsterData.speed,
          abilities: monsterData.abilities,
          actions: monsterData.actions,
          legendary_actions: monsterData.legendary_actions
        };
        monsterStatsArray.push(monsterStats);
        const monsterStatsDiv = `
       <div class="stat-block">
        <hr class="orange-border" />
        <div class="section-left">
          <div class="creature-heading">
            <h1>${monsterData.name}</h1>
            <h2>${monsterData.type}</h2>
          </div> <!-- creature heading -->
          <svg height="5" width="100%" class="tapered-rule"
          </svg>
          <div class="top-stats">
            <div class="property-line first">
              <h4>Armor Class</h4>
              <p>${JSON.stringify(monsterData.armor_class)}</p>
            </div> <!-- property line -->
            <div class="property-line">
              <h4>Hit Points</h4>
              <p>${monsterData.hit_points}</p>
            </div> <!-- property line -->
            <div class="property-line last">
              <h4>Speed</h4>
              <p>${JSON.stringify(monsterData.speed)}</p>
            </div> <!-- property line -->
            <svg height="5" width="100%" class="tapered-rule">
            </svg>
            <div class="abilities">
              <div class="ability-strength">
                <h4>STR</h4>
                <p></p>
              </div> <!-- ability strength -->
              <div class="ability-dexterity">
                <h4>DEX</h4>
                <p></p>
              </div> <!-- ability dexterity -->
              <div class="ability-constitution">
                <h4>CON</h4>
                <p></p>
              </div> <!-- ability constitution -->
              <div class="ability-intelligence">
                <h4>INT</h4>
                <p></p>
              </div> <!-- ability intelligence -->
              <div class="ability-wisdom">
                <h4>WIS</h4>
                <p></p>
              </div> <!-- ability wisdom -->
              <div class="ability-charisma">
                <h4>CHA</h4>
                <p></p>
              </div> <!-- ability charisma -->
            </div> <!-- abilities -->
            <svg height="5" width="100%" class="tapered-rule">
            </svg>
            <div class="property-line first">
              <h4>Damage Immunities</h4>
              <p></p>
            </div> <!-- property line -->
            <div class="property-line">
              <h4>Condition Immunities</h4>
              <p></p>
            </div> <!-- property line -->
            <div class="property-line">
              <h4>Senses</h4>
              <p></p>
            </div> <!-- property line -->
            <div class="property-line">
              <h4>Languages</h4>
              <p></p>
            </div> <!-- property line -->
            <div class="property-line last">
              <h4>Challenge</h4>
              <p></p>
            </div> <!-- property line -->
          </div> <!-- top stats -->
          <svg height="5" width="100%" class="tapered-rule"
          </svg>
          <div class="property-block">
            <h4></h4>
            <p> <i></i> <i></i></p>
          </div> <!-- property block -->
          <div class="property-block">
            <h4></h4>
            <p></p>
          </div> <!-- property block -->
        </div> <!-- section left -->
        <div class="section-right">
          <div class="actions">
            <h3>Actions</h3>
            <div class="property-block">
              <h4></h4>
              <p>${JSON.stringify(monsterData.actions)}</p>
            </div> <!-- property block -->
            <div class="property-block">
              <h4></h4>
              <p><i></i> 
                <i>Hit:</i> 
              </p>
            </div> <!-- property block -->
          </div> <!-- actions -->
          <div class="actions">
            <h3>Legendary Actions</h3>
            <div class="property-block">
              <h4></h4>
              <p>${JSON.stringify(monsterData.legendary_actions)}</p>
            </div> <!-- property block -->
            <div class="property-block">
              <h4></h4>
              <p><i>Melee Weapon Attack:</i> 
                <i>Hit:</i> 
              </p>
            </div> <!-- property block -->
          </div> <!-- actions -->
        </div> <!-- section right -->
        <hr class="orange-border bottom" />
      </div> <!-- stat block -->
        `;
        
        const sanitizedMonsterStatsDiv = monsterStatsDiv.replace(regex, ' '); 
        const monsterStatsContainer = document.createElement('div');
        monsterStatsContainer.innerHTML = sanitizedMonsterStatsDiv;
        monsterStatsWrapper.appendChild(monsterStatsContainer);
        console.log(monsterStatsArray.length)
    });
});
}

// ============== Monster Mash Logic ============ //
const newMonsterArray = [];
mashButton.addEventListener('click', () => {
  monsterStatsWrapper.value = '';
  function mixMonsters(monsterStatsArray) {
    const newMonster = {};
    
    const monster1 = monsterStatsArray[Math.floor(Math.random() * monsterStatsArray.length)];
    const monster2 = monsterStatsArray[Math.floor(Math.random() * monsterStatsArray.length)];
    

    // Mix the selected properties into the new monster object
    newMonster.name = `${monster1.name}-${monster2.name}`;
    newMonster.type = Math.random() < 0.5 ? monster1.type : monster2.type;
    newMonster.challenge_rating = Math.random() < 0.5 ? monster1.challenge_rating : monster2.challenge_rating;
    newMonster.hit_points = Math.floor((monster1.hit_points + monster2.hit_points) / 2);
    newMonster.armor_class = Math.floor((monster1.armor_class + monster2.armor_class) / 2);
    newMonster.speed = Math.random() < 0.5 ? monster1.speed : monster2.speed;
    newMonster.abilities = Math.random() < 0.5 ? monster1.abilities : monster2.abilities;
    newMonster.actions = Math.random() < 0.5 ? monster1.actions : monster2.actions;
    newMonster.legendary_actions = Math.random() < 0.5 ? monster1.legendary_actions : monster2.legendary_actions;

    newMonsterArray.push(newMonster);
    console.log(newMonsterArray);
    return newMonster;
  }

  // Call the mixMonsters function to generate a new monster and add it to the newMonsterArray
  mixMonsters(monsterStatsArray);

  // Loop through the newMonsterArray and create new HTML elements for each newMonster object
  newMonsterArray.forEach((newMonster) => {
    const newMonsterDiv = document.createElement('div');
    // const sanitizedMonsterStatsDiv = JSON.stringify(newMonster).replace(regex, ' ');
    newMonsterDiv.innerHTML = `
    <div class="stat-block">
    <hr class="orange-border" />
    <div class="section-left">
      <div class="creature-heading">
        <h1>${newMonster.name}</h1>
        <h2>${newMonster.type}</h2>
      </div> <!-- creature heading -->
      <svg height="5" width="100%" class="tapered-rule"
      </svg>
      <div class="top-stats">
        <div class="property-line first">
          <h4>Armor Class</h4>
          <p>${JSON.stringify(newMonster.armor_class)}</p>
        </div> <!-- property line -->
        <div class="property-line">
          <h4>Hit Points</h4>
          <p>${newMonster.hit_points}</p>
        </div> <!-- property line -->
        <div class="property-line last">
          <h4>Speed</h4>
          <p>${JSON.stringify(newMonster.speed)}</p>
        </div> <!-- property line -->
        <svg height="5" width="100%" class="tapered-rule">
        </svg>
        <div class="abilities">
          <div class="ability-strength">
            <h4>STR</h4>
            <p></p>
          </div> <!-- ability strength -->
          <div class="ability-dexterity">
            <h4>DEX</h4>
            <p></p>
          </div> <!-- ability dexterity -->
          <div class="ability-constitution">
            <h4>CON</h4>
            <p></p>
          </div> <!-- ability constitution -->
          <div class="ability-intelligence">
            <h4>INT</h4>
            <p></p>
          </div> <!-- ability intelligence -->
          <div class="ability-wisdom">
            <h4>WIS</h4>
            <p></p>
          </div> <!-- ability wisdom -->
          <div class="ability-charisma">
            <h4>CHA</h4>
            <p></p>
          </div> <!-- ability charisma -->
        </div> <!-- abilities -->
        <svg height="5" width="100%" class="tapered-rule">
        </svg>
        <div class="property-line first">
          <h4>Damage Immunities</h4>
          <p></p>
        </div> <!-- property line -->
        <div class="property-line">
          <h4>Condition Immunities</h4>
          <p></p>
        </div> <!-- property line -->
        <div class="property-line">
          <h4>Senses</h4>
          <p></p>
        </div> <!-- property line -->
        <div class="property-line">
          <h4>Languages</h4>
          <p></p>
        </div> <!-- property line -->
        <div class="property-line last">
          <h4>Challenge</h4>
          <p></p>
        </div> <!-- property line -->
      </div> <!-- top stats -->
      <svg height="5" width="100%" class="tapered-rule"
      </svg>
      <div class="property-block">
        <h4></h4>
        <p> <i></i> <i></i></p>
      </div> <!-- property block -->
      <div class="property-block">
        <h4></h4>
        <p></p>
      </div> <!-- property block -->
    </div> <!-- section left -->
    <div class="section-right">
      <div class="actions">
        <h3>Actions</h3>
        <div class="property-block">
          <h4></h4>
          <p>${JSON.stringify(newMonster.actions)}</p>
        </div> <!-- property block -->
        <div class="property-block">
          <h4></h4>
          <p><i></i> 
            <i>Hit:</i> 
          </p>
        </div> <!-- property block -->
      </div> <!-- actions -->
      <div class="actions">
        <h3>Legendary Actions</h3>
        <div class="property-block">
          <h4></h4>
          <p>${JSON.stringify(newMonster.legendary_actions)}</p>
        </div> <!-- property block -->
        <div class="property-block">
          <h4></h4>
          <p><i>Melee Weapon Attack:</i> 
            <i>Hit:</i> 
          </p>
        </div> <!-- property block -->
      </div> <!-- actions -->
    </div> <!-- section right -->
    <hr class="orange-border bottom" />
  </div> <!-- stat block -->
    `;


    document.body.appendChild(newMonsterDiv);
   
    console.log(monsterStatsArray.length)
  });
 
});












// newMonsterDiv.innerHTML = JSON.stringify(mixMonsters(monsterStatsArray));

// const newMonsterDiv = `
// <p>Name: ${newMonster.name}</p>
// <p>Type: ${newMonster.type}</p>
// <p>Challenge Rating: ${newMonster.challenge_rating}</p>
// <p>Hit Points: ${newMonster.hit_points}</p>
// <p>Armor Class: ${newMonster.armor_class}</p>
// <p>Speed: ${JSON.stringify(newMonster.speed)}</p>
// <p>Abilities: ${JSON.stringify(newMonster.abilities)}</p>
// <p>Actions: ${JSON.stringify(newMonster.actions)}</p>
// <p>Legendary Actions: ${JSON.stringify(newMonster.legendary_actions)}</p>
// `;

// const sanitizedNewMonsterStatsDiv = newMonster.replace(regex, ' ');
// const newMonsterContainer = document.createElement('div');
// newMonsterContainer.innerHTML = sanitizedNewMonsterStatsDiv;
// newMonsterDiv.appendChild(newMonsterContainer);

// });



      // const html = `
      // <p>Name: ${newMonster.name}</p>
      // <p>Type: ${newMonster.type}</p>
      // <p>Challenge Rating: ${newMonster.challenge_rating}</p>
      // <p>Hit Points: ${newMonster.hit_points}</p>
      // <p>Armor Class: ${newMonster.armor_class}</p>
      // <p>Speed: ${JSON.stringify(newMonster.speed)}</p>
      // <p>Abilities: ${JSON.stringify(newMonster.abilities)}</p>
      // <p>Actions: ${JSON.stringify(newMonster.actions)}</p>
      // <p>Legendary Actions: ${JSON.stringify(newMonster.legendary_actions)}</p>
      // `;