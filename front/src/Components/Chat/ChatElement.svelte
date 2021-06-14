<script lang="ts">
    import {ChatMessageTypes} from "../../Stores/ChatStore";
    import type {ChatMessage} from "../../Stores/ChatStore";
    import {HtmlUtils} from "../../WebRtc/HtmlUtils";
    import {requestVisitCardsStore} from "../../Stores/GameStore";

    export let message: ChatMessage
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
            <p contenteditable="true" bind:innerHTML={urlifyText}></p>
        {:else if message.type === ChatMessageTypes.userIncoming}
            ➡️: User {message.author} came in
        {:else if message.type === ChatMessageTypes.userOutcoming}
            ⬅️: User {message.author} left
        {/if}
    </div>
    <div class="buttonPart">
        <button class="text-btn" on:click={() => showMenu = true}>...</button>
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
            background: whitesmoke;
            border-radius: 8px;
            margin-bottom: 10px;
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