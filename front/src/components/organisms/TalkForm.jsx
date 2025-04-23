import { useState } from "react";

import Button from "../atoms/Button";
import Presenter from "../molecules/Presenter";
import { useSaveTalk } from "../../store/useSaveTalk";
import CustomDatePicker from "../molecules/CustomDatePicker";
import InputWithError from "../molecules/InputWithError";
import TextareaWithError from "../molecules/TextareaWithError";

function TalkForm(props) {
  const {
    setTitle,
    setTopic,
    setDuration,
    setObjective,
    addPresenter,
    removePresenter,
    setScheduledAt,
    title,
    topic,
    duration,
    objective,
    presenters,
    scheduled_at,
    fetchSave,
  } = useSaveTalk((state) => state);

  const [presenterName, setPresenterName] = useState("");
  const [presenterEmail, setPresenterEmail] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    topic: "",
    duration: "",
    email: "",
    objective: "",
    presenter: "",
    errorMessage: "",
  });

  const hasValidationErrors =
    !title.trim() ||
    !topic.trim() ||
    String(duration).trim() == "0" ||
    !objective.trim() ||
    presenters.length === 0;

  const handleAddPresenter = () => {
    if (presenters.filter((p) => p.email === presenterEmail.trim()).length) {
      setErrors({ ...errors, presenter: "This email is already used." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!presenterName.trim() || !presenterEmail.trim()) {
      setErrors({ ...errors, presenter: "Name and email are required." });
      return;
    }

    if (!emailRegex.test(presenterEmail)) {
      setErrors({ ...errors, presenter: "Invalid email format." });
      return;
    }

    addPresenter({
      username: presenterName.trim(),
      email: presenterEmail.trim(),
    });
    setPresenterName("");
    setPresenterEmail("");
    setErrors({ ...errors, presenter: "" });
  };

  const handleRemovePresenter = (name) => {
    removePresenter(name);
  };

  const validateField = (field, value) => {
    let message = "";
    if (field === "duration" && Number(value) < 0)
      message = "Duration must be zero or more.";
    else {
      const val = String(value).trim();
      setErrors({ ...errors, errorMessage: "" });

      if (!val) message = `${field} is required.`;
    }

    setErrors({ ...errors, [field]: message });

    return !message;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await fetchSave(); // fait le POST et reset le form via Zustand
    setPresenterName("");
    setPresenterEmail("");
    setErrors({
      title: "",
      topic: "",
      duration: "",
      email: "",
      objective: "",
      presenter: "",
      errorMessage: "",
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[#4b3f33]">Create a Talk</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#4b3f33]">
          Talk Parameters
        </h3>
        <InputWithError
          status={"*"}
          labelName="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            validateField("title", e.target.value);
          }}
          placeholder="Title"
          className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]"
          error={errors.title}
        />

        <InputWithError
          status={"*"}
          labelName="Topic"
          type="text"
          name="topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            validateField("topic", e.target.value);
          }}
          placeholder="Title topic"
          className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]"
          error={errors.topic}
        />

        <InputWithError
          status={"*"}
          labelName="Duration"
          type="number"
          name="duration"
          value={duration}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) setDuration(val);
            validateField("duration", e.target.value);
          }}
          placeholder="Duration (min)"
          className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]"
          error={errors.duration}
        />

        <TextareaWithError
          status={"*"}
          labelName="Objective"
          name="objective"
          value={objective}
          onChange={(e) => {
            setObjective(e.target.value);
            validateField("objective", e.target.value);
          }}
          placeholder="Objective"
          className="w-full p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]"
          error={errors.objective}
        />
        <CustomDatePicker onChange={setScheduledAt} />
      </div>

      <div className="space-y-4">
        <Presenter
          status="*"
          onChangeName={(e) => setPresenterName(e.target.value)}
          onChangeEmail={(e) => setPresenterEmail(e.target.value)}
          valueName={presenterName}
          valueEmail={presenterEmail}
          handleAddPresenter={handleAddPresenter}
          error={errors.presenter}
        />
        {presenters.length > 0 && (
          <div className="space-y-2 mt-6">
            {presenters.map(({ username }, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#fcfaf8] border border-[#c8bfb6] p-2 rounded-xl"
              >
                <span>{username}</span>
                <Button
                  type="button"
                  onClick={() => handleRemovePresenter(username)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        variant={hasValidationErrors ? "disabled" : "primary"}
        type="submit"
        onClick={handleSave}
        className="w-full mt-6"
      >
        Save Talk
      </Button>
    </>
  );
}

export default TalkForm
