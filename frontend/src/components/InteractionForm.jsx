const InteractionForm = () => {
  return (
    <form className="space-y-5">

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            HCP Name
          </label>

          <input
            type="text"
            placeholder="Search or select HCP..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Interaction Type
          </label>

          <select className="w-full border rounded-lg px-3 py-2">
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
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Time
          </label>

          <input
            type="time"
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
          placeholder="Hospital Name"
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

          <label>
            <input type="radio" name="sentiment" />
            <span className="ml-2">Positive</span>
          </label>

          <label>
            <input type="radio" name="sentiment" />
            <span className="ml-2">Neutral</span>
          </label>

          <label>
            <input type="radio" name="sentiment" />
            <span className="ml-2">Negative</span>
          </label>

        </div>

      </div>

      {/* Summary */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Summary
        </label>

        <textarea
          rows="4"
          placeholder="Interaction Summary..."
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      {/* Follow Up */}

      <div>

        <label className="block text-sm font-medium mb-1">
          Follow-up Actions
        </label>

        <textarea
          rows="3"
          placeholder="Next Steps..."
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Interaction
      </button>

    </form>
  )
}

export default InteractionForm