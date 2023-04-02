<script context="module">
  export function handleRefresh() {
    document.querySelectorAll("select").forEach(input => input.value = "")
  }
</script>

<script>
  export let type = 'person';
  export let subject = {name:'Arthur'};
  export let subtitle = 'Select Entities in order of preference:';
  export let list = [{name:"Apple"}, {name:"Orange"}, {name:"Tomato"}];
  export let sort_complete = false;
</script>

<div class="card w-40 md:w-52 m-4 p-2 bg-base-100 shadow-xl border lg:w-72" >
  <figure>
  {#if type === 'entity'}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  {/if}
  </figure>
  <div class="card-body">
    <h2 class="card-title">{subject.name}</h2>
    {#if sort_complete === true}
      {#if type === 'person'}
        <p>Selected Entity:</p>

        {#if subject.selected_entity === null}
          <p><strong>None</strong></p>
        {:else}
          <p><strong>{subject.selected_entity.name}</strong></p>
        {/if}
      {:else}
        <p>Selected Candidates: </p>
        {#if subject.slotted_candidates.length === 0}
          <p><strong>None</strong></p>
        {:else}
          <ul class="list-decimal">
          {#each subject.slotted_candidates as list_item }
            <li><strong>{list_item.name}</strong></li>
          {/each}
          </ul>
        {/if}
      {/if}
    {:else}
      <p>{subtitle}</p>
      <ol class="list-decimal">
      {#each list as list_item, i }
        <li>
          <select class="select select-bordered select-xs w-full max-w-xs">
            <option data-subject={subject.name} data-item={null}></option>
            {#each list as list_item, z }
              {#if subject.preferred_list[i] === list_item}
                <option selected data-index= {i} data-subject={subject.name} data-item={list_item.name}>{list_item.name}</option>
              {:else}
                <option data-index= {i} data-subject={subject.name} data-item={list_item.name}>{list_item.name}</option>
              {/if}
            {/each}
          </select>
        </li>
      {/each}
      </ol>
    {/if}
  </div>
</div>
