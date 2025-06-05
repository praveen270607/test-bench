// import React, { useState } from "react";

// const Form = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [projectName, setProjectName] = useState("");
//   const [category, setCategory] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       name,
//       email,
//       mobile,
//       project_name: projectName,
//       category,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Form submitted successfully!");
//         // Optionally clear the form
//         setName("");
//         setEmail("");
//         setMobile("");
//         setProjectName("");
//         setCategory("");
//       } else {
//         alert("Form submission failed.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Server error!");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <label style={styles.label}>
//           Concerned Person name:
//           <input
//             type="text"
//             placeholder="Type here......"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Office mail id:
//           <input
//             type="email"
//             value={email}
//             placeholder="Type here......"
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Mobile number:
//           <input
//             type="tel"
//             value={mobile}
//             placeholder="Type here......"
//             onChange={(e) => setMobile(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Project Name:
//           <input
//             type="text"
//             value={projectName}
//             placeholder="Type here......"
//             onChange={(e) => setProjectName(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Cataegory:
//           <select
//             style={styles.input}
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value={"project"}>project</option>
//             <option value={"testing"}>testing</option>
//           </select>
//         </label>
//         <button type="submit" style={styles.button}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// function App() {
//   return (
//     <>
//       <Form />
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    project_name: "",
    category: "",
  });
  const [submissions, setSubmissions] = useState([]);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/submissions");
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newEntry = { ...formData };
        setSubmissions((prev) => [...prev, newEntry]); // Add new data to table
        setFormData({
          name: "",
          email: "",
          mobile: "",
          project_name: "",
          category: "",
        }); // Reset form
      } else {
        alert("Error submitting form");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const cellStyle = {
    padding: "10px",
    fontFamily: "sans-serif",
    fontSize: "16px",
  };

  return (
    <div style={styles.container}>
      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Concerned Person name:
          <input
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Office mail id:
          <input
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Mobile number:
          <input
            name="mobile"
            value={formData.mobile}
            placeholder="Mobile"
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Project Name:
          <input
            name="project_name"
            value={formData.project_name}
            placeholder="Project Name"
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Cataegory:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Category</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Instrumentation">Instrumentation</option>
            <option value="Civil">Civil</option>
          </select>
        </label>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      {/* TABLE */}
      {/* REFRESH BUTTON */}
      {/* <button
        onClick={fetchData}
        style={{
          padding: "10px 20px",
          borderRadius: "25px",
          backgroundColor: "#6FCF97",
          border: "none",
          color: "#000",
          fontWeight: "bold",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Refresh
      </button> */}

      {/* TABLE */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
          marginLeft: "10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#d3d3d3", textAlign: "left" }}>
            <th style={cellStyle}>name</th>
            <th style={cellStyle}>email</th>
            <th style={cellStyle}>mobile</th>
            <th style={cellStyle}>project_name</th>
            <th style={cellStyle}>category</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((entry, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid black" }}>
              <td style={cellStyle}>{entry.name}</td>
              <td style={cellStyle}>{entry.email}</td>
              <td style={cellStyle}>{entry.mobile}</td>
              <td style={cellStyle}>{entry.project_name}</td>
              <td style={cellStyle}>{entry.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    border: "2px solid black",
    borderRadius: "10px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
  },
  input: {
    marginTop: "5px",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid black",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#6CD3A1",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
