if (typeof window.Phaser === 'undefined') {
  await new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = import.meta.url.replace(/-compat(?=\.js$)/, '')
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export default window.Phaser
