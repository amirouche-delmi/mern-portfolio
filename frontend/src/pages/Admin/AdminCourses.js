import { Form, Input, Modal, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminCourses() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItemForEdit) {
      form.setFieldsValue({
        ...selectedItemForEdit,
        technologies: selectedItemForEdit?.technologies?.join(", ") || "",
      });
    } else {
      form.resetFields();
    }
  }, [selectedItemForEdit, form]);

  const handleCancel = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedItemForEdit) {
        // Update Course
        response = await axios.post("/api/portfolio/update-Course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        // Add new Course
        response = await axios.post("/api/portfolio/add-Course", values);
      }

      if (response.data.success) {
        message.success(response.data.message);
        handleCancel();
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
      const response = await axios.post("/api/portfolio/delete-Course", {
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

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {courses.map((course, index) => (
          <div
            key={index}
            className="shadow border p-5 border-gray-400 flex flex-col gap-5"
          >
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>
            <hr />
            <img
              src={course.image}
              alt="img"
              className="h-60 w-80 rounded"
            />
            <h1>{course.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(course)}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        visible={showAddEditModal}
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the course title" }]}
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
            rules={[{ required: true, message: "Please enter the course description" }]}
          >
            <Input.TextArea rows={3} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="link"
            label="Link"
            rules={[{ required: true, message: "Please enter the course link" }]}
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
    </div>
  );
}

export default AdminCourses;
