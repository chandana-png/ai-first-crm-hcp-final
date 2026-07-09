import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { addInteraction } from "../redux/interactionSlice";

const InteractionForm = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    doctor_name: "",
    hospital: "",
    specialty: "",
    interaction_type: "Meeting",
    products_discussed: "",
    summary: "",
    follow_up_date: "",

    // UI-only fields
    interaction_date: "",
    interaction_time: "",
    sentiment: "Positive",
    follow_up_actions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        doctor_name: formData.doctor_name,
        hospital: formData.hospital,
        specialty: formData.specialty,
        interaction_type: formData.interaction_type,
        products_discussed: formData.products_discussed,
        summary: formData.summary,
        follow_up_date: formData.follow_up_date || null,
      };

      const response = await api.post(
        "/interaction/manual",
        payload
      );

      dispatch(addInteraction(response.data));

      alert("Interaction saved successfully!");

      setFormData({
        doctor_name: "",
        hospital: "",
        specialty: "",
        interaction_type: "Meeting",
        products_discussed: "",
        summary: "",
        follow_up_date: "",
        interaction_date: "",
        interaction_time: "",
        sentiment: "Positive",
        follow_up_actions: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save interaction");
    }

    setLoading(false);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>

      {/* Row 1 */}

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            HCP Name
          </label>

          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            placeholder="Search or select HCP..."
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Interaction Type
          </label>

          <select
            name="interaction_type"
            value={formData.interaction_type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
          </select>
        </div>

      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Date
          </label>

          <input
            type="date"
            name="interaction_date"
            value={formData.interaction_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Time
          </label>

          <input
            type="time"
            name="interaction_time"
            value={formData.interaction_time}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

      </div>

      {/* Hospital */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Hospital
        </label>

        <input
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      {/* Specialty */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Specialty
        </label>

        <input
          type="text"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          placeholder="Cardiology, Neurology..."
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      {/* Products */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Products Discussed
        </label>

        <textarea
          rows="3"
          name="products_discussed"
          value={formData.products_discussed}
          onChange={handleChange}
          placeholder="Mention products..."
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      {/* Sentiment */}

      <div>

        <label className="block text-sm font-medium mb-2">
          HCP Sentiment
        </label>

        <div className="flex gap-6">

          {["Positive","Neutral","Negative"].map((item)=>(
            <label key={item}>
              <input
                type="radio"
                name="sentiment"
                value={item}
                checked={formData.sentiment===item}
                onChange={handleChange}
              />
              <span className="ml-2">{item}</span>
            </label>
          ))}

        </div>

      </div>

      {/* Summary */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Summary
        </label>

        <textarea
          rows="4"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Interaction Summary..."
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      {/* Follow-up Date */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Follow-up Date
        </label>

        <input
          type="date"
          name="follow_up_date"
          value={formData.follow_up_date}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      {/* Follow-up Actions */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Follow-up Actions
        </label>

        <textarea
          rows="3"
          name="follow_up_actions"
          value={formData.follow_up_actions}
          onChange={handleChange}
          placeholder="Next Steps..."
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save Interaction"}
      </button>

    </form>
  );
};

export default InteractionForm;