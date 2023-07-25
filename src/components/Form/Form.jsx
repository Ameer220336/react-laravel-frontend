import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

export default function Form() {
  const toast = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: email,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: () => {
      let errors = {};
      console.log(name);
      if (!name) {
        errors.name = "Name is required.";
      }
      if (!email) {
        errors.email = "Email is required.";
      }
      if (!password) {
        errors.password = "Password is required.";
      }
      if (!confirmPassword) {
        errors.password = "Confirm Password is required.";
      }
      if (password !== confirmPassword) {
        errors.password = "Password and Confirm Password must be same.";
        errors.confirmPassword = "Password and Confirm Password must be same.";
      }

      return errors;
    },
    onSubmit: async () => {
      let form_data = {
        acName: name,
        acEmail: email,
        acHash: password,
        "confirm-password": confirmPassword,
      };
      try {
        const response = await fetch("http://localhost:8000/api/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(form_data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data_response = await response.json();
        console.log("Response data:", data_response);
        show();
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log("Error:", error.message);
      }
    },
  });

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
        <Toast ref={toast} />
        <label htmlFor="name">Name</label>
        <span className="p-input-icon-left">
          <i className="pi pi-user" />
          <InputText
            inputId="name"
            name="name"
            placeholder="Name"
            className={classNames({ "p-invalid": isFormFieldInvalid("name") })}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </span>
        {getFormErrorMessage("name")}

        <label htmlFor="email">Email</label>
        <span className="p-input-icon-left">
          <i className="pi pi-envelope" />
          <InputText
            inputId="email"
            type="email"
            required
            name="email"
            placeholder="email"
            className={classNames({ "p-invalid": isFormFieldInvalid("email") })}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </span>
        {getFormErrorMessage("email")}

        <label htmlFor="password">Password</label>
        <span className="p-input-icon-left">
          <i className="pi pi-lock" />
          <InputText
            type="password"
            inputId="password"
            required
            name="password"
            placeholder="Password"
            className={classNames({
              "p-invalid": isFormFieldInvalid("password"),
            })}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </span>
        {getFormErrorMessage("password")}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <span className="p-input-icon-left">
          <i className="pi pi-lock" />
          <InputText
            inputId="confirmPassword"
            required
            name="confirmPassword"
            placeholder="confirm Password"
            type="password"
            className={classNames({
              "p-invalid": isFormFieldInvalid("confirmPassword"),
            })}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
        </span>
        {getFormErrorMessage("confirmPassword")}
        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}
