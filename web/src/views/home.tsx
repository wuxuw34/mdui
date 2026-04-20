import { MButton, MCard } from "mdui";

export default function Home() {
  return (
    <div>
      <MCard className="min-h-60 flex flex-row items-center">
        <div className="flex flex-col h-full justify-center ">
          <h1 className="text-3xl font-bold mb-3">
            Material Design 3 React UI Library
          </h1>
          <span className="text-gray-600 ">
            Material Design 3 is Google’s open-source design system for building
            beautiful, usable products.
          </span>
          <MButton
            variant="filled"
            size="md"
            className="mt-3 w-fit"
          >
            开始
          </MButton>
        </div>
      </MCard>
    </div>
  );
}
