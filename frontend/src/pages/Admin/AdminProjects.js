import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const handleCancel = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    setType("add");
  };

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies?.split(",") || [];
      values.technologies = tempTechnologies;
      dispatch(ShowLoading());

      let response;

      if (selectedItemForEdit) {
        // Update Project
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/portfolio/update-project`, {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        // Add new Project
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/portfolio/add-project`, values);
      }

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/portfolio/delete-project`, {
        _id: item._id,
      });

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const { TextArea } = Input;

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
            setType("add");
          }}
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project, index) => (
          <div
            key={index}
            className="shadow border p-5 border-gray-400 flex flex-col gap-5"
          >
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
            <hr />
            <img src={project.image} alt="img" className="h-60 w-80" />
            <h1>{project.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            key={selectedItemForEdit?._id || "add"}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              technologies: selectedItemForEdit?.technologies?.join(", ") || "",
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the project title" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              rules={[{ required: true, message: "Please enter the image URL" }]}
            >
              <Input placeholder="Image" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter the project description" }]}
            >
              <TextArea rows={3} placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="technologies"
              label="Technologies"
            >
              <TextArea rows={2} placeholder="Technologies (comma separated)" />
            </Form.Item>
            <Form.Item
              name="link"
              label="Link"
              rules={[{ required: true, message: "Please enter the project link" }]}
            >
              <Input placeholder="Link" />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2" type="submit">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
