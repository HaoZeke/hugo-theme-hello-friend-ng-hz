function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
  addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const codeLines = Array.from(highlightDiv.querySelectorAll(":last-child > .chroma > code > .line"));

  const codeFragments = codeLines.map(line => {
    return Array.from(line.childNodes)
      .filter(el => !el.classList || !el.classList.contains("ln"))
      .map(el => el.textContent)
      .join('');
  });

  let codeToCopy = codeFragments.join('');
  codeToCopy = codeToCopy.replace(/\n{3,}/g, '\n\n');

  try {
    await navigator.clipboard.writeText(codeToCopy);
  } catch (err) {
    console.error("Failed to copy code:", err);
  } finally {
    codeWasCopied(button);
  }
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function() {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

document.querySelectorAll(".highlight")
  .forEach(highlightDiv => createCopyButton(highlightDiv));
