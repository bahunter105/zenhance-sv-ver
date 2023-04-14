<script>
  // import Candidate from "$lib/sort_algo/classes.js";
  import Card, {handleRefresh} from '$lib/Card.svelte'
  let sort_complete = false

  class Candidate {
    constructor(name, preferred_list = [], slotted = false, selected_entity = null) {
      this.name = name;
      this.preferred_list = preferred_list; //array
      this.slotted = slotted; //true means that the candidate has been slotted into an entity (not necessarily final)
      this.selected_entity = selected_entity //entity that has been confirmed through sorting
    }
  }
  class Entity {
    constructor(name, slots, preferred_list = [], slotted_candidates = []) {
      this.name = name;
      this.slots = slots;
      this.preferred_list = preferred_list;
      this.slotted_candidates = slotted_candidates; //array of candidates as go through the sorting
    }
  }
  // SEEDING
  // Candidate seeding
  const candidate_array = []
  const arthur = new Candidate('Arthur')
  candidate_array.push(arthur)
  const sunny = new Candidate('Sunny')
  candidate_array.push(sunny)
  const joseph = new Candidate('Joseph')
  candidate_array.push(joseph)
  const latha = new Candidate('Latha')
  candidate_array.push(latha)
  const darrius = new Candidate('Darrius')
  candidate_array.push(darrius)

  // Entity seeding
  const entity_array = []
  const mercy = new Entity('Mercy', 2, [darrius, joseph])
  entity_array.push(mercy)
  const city = new Entity('City', 2, [darrius, arthur, sunny, latha, joseph])
  entity_array.push(city)
  const general = new Entity('General', 2, [darrius, arthur, joseph, latha])
  entity_array.push(general)

  // Adding Entity Objects to Candidates
  arthur.preferred_list = [city]
  sunny.preferred_list = [city, mercy]
  joseph.preferred_list = [city, general, mercy]
  latha.preferred_list = [mercy, city, general]
  darrius.preferred_list = [city, mercy, general]

  function reassign() {
    let data_list = document.querySelectorAll("select")
    data_list.forEach(data_item => {
      let data = data_item.selectedOptions[0].dataset
      let subject = candidate_array.find(candidate_array => candidate_array.name === data.subject);
      let item = null
      // console.log(data)
      // console.log(subject)
      if (subject === undefined) {
        subject = entity_array.find(entity_array => entity_array.name === data.subject);
        item = candidate_array.find(candidate_array => candidate_array.name === data.item);

      } else {
        item = entity_array.find(entity_array => entity_array.name === data.item);
      }

      if (item === undefined) {
        item = null
      }
      subject.preferred_list[data.index] = item
    })
  }

  // Sorting Algo
  // Initial Sorting Algo
  function initial_sort(candidate_array, entity_to_skip = null) {
    // Loop through each candidate.
    candidate_array.forEach(candidate => {
      // Advance to next candidate if candidate already has a selected_entity or if it has been slotted.
      if (candidate.selected_entity != null) return
      if (candidate.slotted === true) return

      // Loop through the prefferred entities, with guard clauses for:
      candidate.preferred_list.forEach(entity => {
        // Skip previously checked entity to avoid endless loop
        if (entity === entity_to_skip) return

        // Advance if candidate already has a selected_entity or if it has been slotted.
        if (candidate.selected_entity != null) return
        if (candidate.slotted === true) return

        // Return if candidate is not on entities list
        if (!entity.preferred_list.includes(candidate)) return

        // Get rank of candidate among entity's preferred_list
        let rank_index = entity.preferred_list.findIndex(element => element == candidate)

        // Compare to others already slotted in
        // Directly slot in candidtate if slot is empty or doesnt have a candidate with a higher index

        if (entity.slotted_candidates.length === 0 || entity.slotted_candidates.find(slotted_candidate =>
            entity.preferred_list.findIndex(candidate => candidate === slotted_candidate) > rank_index
            ) === undefined) {
          // debugger
          entity.slotted_candidates.push(candidate)
          candidate.slotted = true
        } else {
          // Else, find other slotted in candidate with the first rank index greater
          let first_greater_ranked_slotted_candidate =  entity.slotted_candidates.find(slotted_candidate =>
            entity.preferred_list.findIndex(candidate => candidate === slotted_candidate) > rank_index
            )

            // Find index of first_greater_ranked_slotted_candidate in the slotted array
            let insert_index = entity.slotted_candidates.findIndex(candidate => candidate === first_greater_ranked_slotted_candidate)
            // debugger
            // User insert_index to insert candidate into slotted_candidate array
            entity.slotted_candidates.splice(insert_index, 0, candidate)
            candidate.slotted = true
          }

        // If candidate is one of the top candidates of the entity, update candidate as selected and return
        if (rank_index < entity.slots){
          candidate.selected_entity = entity
        }

        // Check entity to see if any candidates are no longer in their accepted slots & run sort function again
        if (entity.slotted_candidates.length > entity.slots){
          // debugger
          let unslotted_candidates = entity.slotted_candidates.splice(entity.slots)
          // Set each candidate to slotted = false
          unslotted_candidates.forEach(candidate => candidate.slotted = false)
          // debugger
          // Save entity slotted_candidates with only the number of allowed slots.
          entity.slotted_candidates = entity.slotted_candidates.slice(0, entity.slots)
          // Run sorting exercise with unslotted_candidates (which should run through the other entities in their preferences)
          initial_sort(unslotted_candidates, entity) // Add entity to skip the checking again and to avoid endless loop
        }

      })

    });
  }

  // finalize sort by
  function finalize_sort(candidate_array) {
    candidate_array.forEach(candidate => {
      // Advance to next candidate if candidate already has a selected_entity or if it has not been slotted.
      if (candidate.slotted === false) return
      if (candidate.selected_entity != null) return

      // Check each entity in candidates preferences to see if they are slotted in.
      candidate.preferred_list.forEach(entity => {
        if (candidate.slotted === false) return
        if (entity.slotted_candidates.includes(candidate)){
          candidate.selected_entity = entity
        }
      })

    })
  }

  // Combined Final Algo
  function sort(candidate_array) {
    initial_sort(candidate_array)
    finalize_sort(candidate_array)
  }

  function handleClick() {
    this.disabled = true

    // a. reassign
    reassign()
    // b. run sort functions
    sort(candidate_array)
    // c. update cards
    sort_complete = true
    // sort()
  }
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <!-- <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li tabindex="0">
          <a class="justify-between">
            Parent
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div> -->
    <a href="/" class="btn btn-ghost normal-case text-xl" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </a>
  </div>
  <div class="navbar-center flex">
      <button on:click|once={handleClick} class="btn btn-success shadow-md">Sort</button>
  </div>
  <div style="display:none" class="navbar-center flex">
    <ul class="menu menu-horizontal px-1">
      <li><a data-sveltekit-reload href='/sorting'>Refresh</a></li>
      <li><button on:click={handleRefresh}>Clear</button></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn" data-sveltekit-reload href='/sorting'>Refresh</a>
    <!-- <btn class="btn">Sort</btn> -->
  </div>
</div>

<div class="container mx-auto flex flex-wrap lg:flex-nowrap justify-center">
  {#each candidate_array as candidate (candidate.name) }
    <Card type ={'person'} subject = {candidate} subtitle = {"Select Entities in order of preference:"} list = {entity_array} sort_complete = {sort_complete} />
  {/each}
</div>

<div class="flex flex-col">
  <div class="divider">
    <button on:click|once={handleClick} class="btn btn-wide btn-success m-4 p-2 shadow-md">Run Sorting Algorithm</button>
  </div>
</div>


<div class="container mx-auto flex flex-wrap lg:flex-nowrap justify-center">
  {#each entity_array as entity (entity.name) }
    <Card type = {'entity'} subject = {entity} subtitle = {"Select Candidates in order of preference:"} list = {candidate_array} sort_complete = {sort_complete}/>
  {/each}
</div>
