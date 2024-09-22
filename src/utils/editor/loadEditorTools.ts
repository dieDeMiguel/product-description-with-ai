export const loadEditorTools = async () => {
  const { default: Embed } = await import("@editorjs/embed");
  const { default: List } = await import("@editorjs/list");
  const { default: Paragraph } = await import("@editorjs/paragraph");

  return {
    paragraph: {
      class: Paragraph,
      inlineToolbar: ["link", "bold", "italic", "underline"],
    },
    embed: {
      class: Embed,
      readOnly: true,
    },
    list: {
      class: List,
      inlineToolbar: ["link", "bold", "italic"],
      readOnly: true,
      toolbox: [
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 36 34.5"><g><g id="Layer_1"><path d="M34.1,27.7H10.6c-.2,0-.3.1-.3.3v2.2c0,.2.1.3.3.3h23.5c.2,0,.3-.1.3-.3v-2.2c0-.2-.1-.3-.3-.3ZM34.1,4.9H10.6c-.2,0-.3.1-.3.3v2.2c0,.2.1.3.3.3h23.5c.2,0,.3-.1.3-.3v-2.2c0-.2-.1-.3-.3-.3ZM34.1,16.3H10.6c-.2,0-.3.1-.3.3v2.2c0,.2.1.3.3.3h23.5c.2,0,.3-.1.3-.3v-2.2c0-.2-.1-.3-.3-.3Z"/><path d="M3.9,9h1.2V3.4h-1.2l-1.5,1v1.1l1.4-1h0v4.5Z"/><path d="M2.6,20h4.1v-.9h-2.8l.3.2v-.5l-.3.5,1.4-1.3c.3-.3.6-.6.8-.8.2-.2.3-.5.4-.7,0-.2.1-.4.1-.6h0c0-.3,0-.6-.3-.9-.2-.2-.4-.4-.7-.6-.3-.1-.6-.2-1-.2s-.8,0-1.1.2c-.3.2-.6.4-.7.6-.2.3-.3.6-.3.9h0s1.1,0,1.1,0h0c0-.2,0-.4.1-.5,0-.1.2-.2.3-.3.1,0,.3-.1.5-.1s.3,0,.5.1c.1,0,.2.2.3.3,0,.1.1.3.1.4h0c0,.1,0,.3,0,.4,0,.1-.2.3-.3.4-.1.2-.4.4-.6.6l-1.8,1.8v.8Z"/><path d="M4.7,32.1c.4,0,.8,0,1.2-.2.3-.1.6-.3.8-.6.2-.3.3-.6.3-.9h0c0-.4-.1-.7-.4-.9-.3-.2-.6-.4-1-.4h0c.2,0,.4-.2.6-.3.2-.1.3-.3.4-.4.1-.2.2-.4.2-.6h0c0-.3,0-.6-.2-.8-.2-.2-.4-.4-.7-.5-.3-.1-.7-.2-1.1-.2s-.7,0-1,.2c-.3.1-.5.3-.7.6-.2.2-.3.5-.3.9h0s1.1,0,1.1,0h0c0-.2,0-.3.1-.4,0-.1.2-.2.3-.3.1,0,.3,0,.5,0s.3,0,.5,0c.1,0,.2.1.3.3,0,.1.1.2.1.4h0c0,.2,0,.3-.1.4,0,.1-.2.2-.3.3-.1,0-.3,0-.5,0h-.6v.8h.6c.3,0,.6,0,.8.2.2.1.3.4.3.6h0c0,.2,0,.3-.1.4,0,.1-.2.2-.3.3-.1,0-.3.1-.5.1s-.4,0-.5,0c-.2,0-.3-.2-.4-.3,0-.1-.1-.2-.2-.4h0s-1.1,0-1.1,0h0c0,.4.1.7.3.9.2.3.4.5.8.6.3.1.7.2,1.1.2Z"/></g></g></svg>',
          title: "Ordered List",
        },
      ],
    },
    unordered: {
      class: List,
      inlineToolbar: ["link", "bold", "italic"],
      readOnly: true,
      toolbox: [
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 103.3"><g><g id="Layer_1"><path d="M87.5,50c0,20.7-16.8,37.5-37.5,37.5S12.5,70.7,12.5,50,29.3,12.5,50,12.5s37.5,16.8,37.5,37.5Z"/></g></g></svg>',
          title: "Unordered List",
        },
      ],
      config: {
        defaultStyle: "unordered",
      },
    },
  };
};
