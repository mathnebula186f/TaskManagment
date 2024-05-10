const router = require("express").Router();
const task = require("../models/task");
const Task = require("../models/task");
const User = require("../models/user");

router.post("/create-task", async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title: title, desc: desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    console.log("user id=",id,"task id=",taskId)
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId} });
    res.status(200).json({ message: "Task Created Succesfully!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.get("/get-all-tasks", async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });

    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    const UserId = req.headers.id;
    await User.findByIdAndUpdate(UserId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.put("/update-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.put("/update-imp-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const importantTask = TaskData.important;
    await Task.findByIdAndUpdate(id, { important: !importantTask });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.put("/update-complete-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const completeTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, { complete: !completeTask });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.get("/get-imp-tasks", async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const ImpTaskData = Data.tasks;
    res.status(200).json({ data: ImpTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});
router.get("/get-complete-tasks", async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const CompleteTaskData = Data.tasks;
    res.status(200).json({ data: CompleteTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});
router.get("/get-Incomplete-tasks", async (req, res) => {
    try {
      const { id } = req.headers;
      const Data = await User.findById(id).populate({
        path: "tasks",
        match: { complete: false },
        options: { sort: { createdAt: -1 } },
      });
      const InCompleteTaskData = Data.tasks;
      res.status(200).json({ data: InCompleteTaskData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });



module.exports = router;
