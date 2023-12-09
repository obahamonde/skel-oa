import ChatItem from "./ChatItem";

const dataMain = [
  {
    key: 0,
    text: "Infirmus scaphium namucense vilis induco lacus. Piger distulo putus. Insula demo multus laboro cupressus.",
    isUser: true,
  },
  {
    key: 1,
    text: "Infirmus scaphium namucense vilis induco lacus. Piger distulo putus. Insula demo multus laboro cupressus.",
    isUser: false,
  },
  {
    key: 2,
    text: "Saeta prolatio impendeo sentio praevenio magnopere pertorqueo velociter aperte prolatio.",
    isUser: true,
  },
  {
    key: 3,
    text: "Plurimus laetor rogo. Maxime limen immortalis defaeco immerito decorus niveus puchre liberaliter huic. ",
    isUser: false,
    images: [
      { key: 0, url: "https://assets.codepen.io/3685267/gpt-redesign-0.png" },
      { key: 1, url: "https://assets.codepen.io/3685267/gpt-redesign-1.png" },
      { key: 2, url: "https://assets.codepen.io/3685267/gpt-redesign-2.png" },
      { key: 3, url: "https://assets.codepen.io/3685267/gpt-redesign-3.png" },
      { key: 4, url: "https://assets.codepen.io/3685267/gpt-redesign-4.png" },
    ],
  },
  {
    key: 4,
    text: "Quilibet forte spero mundus contages quaestio praebeo onero.",
    isUser: true,
  },
  {
    key: 5,
    text: "Quilibet forte spero mundus contages quaestio praebeo onero.",
    isUser: false,
  },
  {
    key: 6,
    text: "Quilibet forte spero mundus contages quaestio praebeo onero.",
    isUser: true,
  },
  {
    key: 7,
    text: "Sure, here is an example of NFTs",
    isUser: false,
    images: [
      { key: 0, url: "https://assets.codepen.io/3685267/gpt-redesign-5.png" },
      { key: 1, url: "https://assets.codepen.io/3685267/gpt-redesign-6.png" },
      { key: 2, url: "https://assets.codepen.io/3685267/gpt-redesign-7.png" },
      { key: 3, url: "https://assets.codepen.io/3685267/gpt-redesign-8.png" },
      { key: 4, url: "https://assets.codepen.io/3685267/gpt-redesign-9.png" },
    ],
  },
];scrollX

function Chat() {
  return (
    <div className=" " style={{ marginLeft: "384px", marginRight: "320px" }}>
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-48">
        {dataMain.map((i) => (
          <ChatItem item={i} key={i.key} />
        ))}
      </div>
    </div>
  );
}


export default Chat;