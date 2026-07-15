import React from 'react'

const Signup = () => {
return (
  <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create Account
      </h1>

      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="emailId"
              placeholder="Enter email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
              name="gender"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Photo URL
            </label>
            <input
              type="text"
              name="photoUrl"
              placeholder="https://example.com/profile.jpg"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple skills using commas.
            </p>
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              About
            </label>
            <textarea
              name="about"
              rows="4"
              placeholder="Tell us something about yourself..."
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
);
}

export default Signup