
function xfetch(...args) {
  const ms = new MessageChannel()
  window.popup.postMessage(args, '*', [ms.port1])

  return new Promise((res, rej) => {

    ms.port2.onmessage = ({ data }) => {
      const stream = new ReadableStream({
        start(controller) {

          ms.port2.onmessage = evt => {
            if (evt.data === true)
              controller.close()
            else
              controller.enqueue(evt.data)
          }
        }
      })

      res(new Response(stream, data))
    }
  })
}

export default xfetch
