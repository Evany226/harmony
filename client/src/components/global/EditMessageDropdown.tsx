interface EditMessageDropdownProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsEditing: (value: boolean) => void;
  initialValue: string;
}

export default function EditMessageDropdown({
  handleSubmit,
  setIsEditing,
  initialValue,
}: EditMessageDropdownProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-zinc-700 px-2 rounded-md my-2">
        <input
          className="outline-0 w-full bg-zinc-700 text-sm py-2 px-1 text-gray-300 lowercase"
          placeholder=""
          name="content"
          defaultValue={initialValue}
        ></input>
      </div>
      <p className="text-sm text-gray-300">
        escape to{" "}
        <span
          onClick={() => setIsEditing(false)}
          className="text-purple-500 cursor-pointer"
        >
          cancel
        </span>{" "}
        - enter to{" "}
        <button type="submit" className="text-purple-500 cursor-pointer">
          save
        </button>
      </p>
    </form>
  );
}
