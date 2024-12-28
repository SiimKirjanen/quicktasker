function LabelCreation() {
  return (
    <div className="label-creation">
      <input
        type="text"
        placeholder="Create a new label"
        className="label-creation__input"
      />
      <button className="label-creation__button">Create</button>
    </div>
  );
}

export { LabelCreation };
