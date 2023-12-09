
import { Icon } from "@iconify/react";``

export default function ChatHeader() {
  return (
    <div className="fixed top-0 inset-x-0 z-10">
      <div
        className="bg-body border-b border-b-line z-10 bg-opacity-30 backdrop-blur-md"
        style={{ marginLeft: "384px", marginRight: "320px" }}
      >
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between py-2">
          <div className="inline-flex items-center">
            <h1 className="ml-2 font-semibold text-xl">Thread Title</h1>
          </div>
          <div className="inline-flex items-center space-x-3">
            <button
              className="w-9 h-9 grid place-items-center bg-card rounded-md"
              onClick={() => {}}
            >
              <Icon icon="mdi-delete" className="w-5 h-5" />
            </button>
            <button
              className="w-9 h-9 grid place-items-center bg-card rounded-md"
              onClick={() => {}}
            >
              <Icon icon="mdi-floppy" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}