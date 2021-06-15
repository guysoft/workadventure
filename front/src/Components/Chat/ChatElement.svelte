<script lang="ts">
    import {ChatMessageTypes} from "../../Stores/ChatStore";
    import type {ChatMessage} from "../../Stores/ChatStore";
    import {HtmlUtils} from "../../WebRtc/HtmlUtils";
    import {requestVisitCardsStore} from "../../Stores/GameStore";

    export let message: ChatMessage;
    let showMenu: boolean = false;
    
    $: urlifyText = HtmlUtils.urlify(message.text);
    
    function openVisitCard() {
        requestVisitCardsStore.set(message.visitCardUrl);
    }
</script>

<div class="chatElement">
    <div class="messagePart">
        {#if message.type === ChatMessageTypes.text}
            <h4>{message.author}:</h4>
            <p class="other-text" contenteditable="true" bind:innerHTML={urlifyText}></p>
        {:else if message.type === ChatMessageTypes.userIncoming}
            ➡️: User {message.author} came in
        {:else if message.type === ChatMessageTypes.userOutcoming}
            ⬅️: User {message.author} left
        {:else if message.type === ChatMessageTypes.me}
            <h4>Me:</h4>
            <p class="my-text" contenteditable="true" bind:innerHTML={urlifyText}></p>
        {/if}
    </div>
    <div class="buttonPart">
        <button class="text-btn" on:click={() => showMenu = !showMenu}>...</button>
        {#if showMenu}
            <ul class="selectMenu">
                <li><button class="text-btn" disabled={!message.visitCardUrl} on:click={openVisitCard}>Visit card</button></li>
            </ul>
        {/if}
    </div>
</div>

<style lang="scss">
    * {
        font-family: 'Press Start 2P' !important;
    }
    .chatElement {
      display: flex;
      margin-bottom: 20px;
      
      .messagePart {
        flex-grow:1;

        p {
          border-radius: 8px;
          margin-bottom: 10px;
          &.other-text {
            background: whitesmoke; 
          }
          
          &.my-text {
            background: #6489ff;
          }
        }
      }
    }

    button.text-btn {
      border: none;
      background:none;
    }
  
    ul.selectMenu {
      background-color: whitesmoke;
      position: absolute;
    }
</style>