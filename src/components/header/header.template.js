export function createInput(state) {
  return `        
        <input type="text" class="input" value="${state}" />

        <div>
          <div class="button" data-button="delete">
            <i class="material-icons" data-button="delete">delete</i>
          </div>

          <div class="button" data-button="exit">
            <i class="material-icons" data-button="exit">exit_to_app</i>
          </div>
       </div>
    `;
}
