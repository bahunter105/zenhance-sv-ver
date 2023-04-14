<script>
  import { enhance } from '$app/forms';
  // import { getContext } from "svelte";

  // let users = getContext('users')
  // /** @type {import('./$types').ActionData} */
  // export let form;
  import {orgUsersStore} from '$lib/functions/orgUsersStore.js';
	// import { subscribe } from 'svelte/store';

  let users
  // console.log(orgUsersStore)
  orgUsersStore.subscribe((data) => {
    users = data
  })
  // console.log(users)

  let numberOfRolesString
  let numberOfRoles
  function updateRoles() {
    // console.log(typeof parseInt(numberOfRoles))
    numberOfRoles = parseInt(numberOfRolesString)
  }

  let teamName
  let teamGoal

  let group = 1

  function nextFormPart() {
    group += 1
    console.log(group)
  }

  function previousFormPart() {
    group -= 1
    console.log(group)
  }
</script>

<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="flex flex-col items-center">
      <form class="flex flex-col items-center" method="post" action="/canvas">
        {#if group ==  1}
          <h3 class="text-lg font-bold">Create Your Team!</h3>
          <input bind:value={teamName} class="my-1 input input-xs input-bordered w-full" name="name" type="text" placeholder="Team Name"/>
          <select bind:value={numberOfRolesString} on:change={updateRoles} class="my-1 input input-sm input-bordered w-full" name="number">
            <option disabled selected>Number of People</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
          <!-- <select class="my-1 input input-sm input-bordered w-full" name="group">
            <option disabled selected>Group</option>
            <option>Group A</option>
            <option>Group B</option>
          </select> -->
          <input bind:value={teamGoal} class="my-1 input input-sm input-bordered w-full" name="goal" type="text" placeholder="Goal (You can edit this later)"/>
          <button on:click={nextFormPart} class="my-2 btn btn-accent">Next</button>
        {/if}
        {#if group == 2}
            <h3 class="text-lg font-bold">Select Roles</h3>
            <input name="name" type="hidden" value={teamName}>
            <input name="goal" type="hidden" value={teamGoal}>
            {#each Array(numberOfRoles) as _, i}
              <div class="flex border rounded my-1">
                <select class="my-1 input select-xs select-ghost w-full" name="role{i}">
                  <option disabled selected>Role</option>
                  <option>Business Analyst</option>
                  <option>Developer</option>
                  <option>Junior Developer</option>
                  <option>Product Owner</option>
                  <option>Quality Assurance (QA)</option>
                  <option>Scrum Master</option>
                  <option>SME</option>
                  <option>Team Lead</option>
                </select>
                <select class="my-1 input select-xs select-ghost w-full" name="user{i}">
                    <option disabled selected>Name (Can Select Later)</option>
                  {#each users as user}
                    <option value={user.id}>{user.name}</option>
                  {/each}
                </select>
              </div>
            {/each}
            <div class="flex">
              <button on:click={previousFormPart} class="my-2 mx-3 btn btn-accent w-1/3">Back</button>
              <div class="w-1/3"></div>
              <button class="my-2 mx-3 btn btn-accent w-1/3">Let's Go!</button>
            </div>
        {/if}
        </form>

    </div>
  </div>
</div>
