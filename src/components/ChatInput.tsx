import { Icon } from "@iconify/react";

function ChatInput() {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-input pt-8">
      <div className="" style={{ marginLeft: "384px", marginRight: "320px" }}>
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex justify-center py-2">
            <button
              className="py-2.5 px-6 rounded-md bg-card flex items-center"
              onClick={() => {}}
            >
              <Icon icon="mdi-reload" className="w-5 h-5" />
              <span className="ml-2">Regenerate Anwser</span>
            </button>
          </div>

          <div className="bg-card flex flex-row items-center justify-center rounded-md relative">
            <textarea
              rows={2}
              className="w-full bg-card rounded-md py-2 px-4 resize-none"
            />

            <div
              className="flex flex-col items-center justify-center space-x-3"
              style={{
                right: "16px",
                top: "50%",
              }}
            >
              <button
                className="w-10 h-10 grid place-items-center rounded-md text-white"
                onClick={() => {}}
              >
                <Icon icon="mdi-microphone" className="w-5 h-5" />
              </button>
              <button
                className=" w-10 h-10 grid place-items-center bg-brandBlue text-white rounded-md"
                onClick={() => {}}
              >
                <Icon icon="mdi-send" className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;