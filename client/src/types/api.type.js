import {
  PermissionType,
  TaskPriorityEnumType,
  TaskStatusEnumType,
} from "@/constant";

// Login & Register
// loginType => { email: string, password: string }
export const loginSample = {
  email: "",
  password: "",
};

// Login response example
export const loginResponseSample = {
  message: "",
  access_token: "",
  user: {
    _id: "",
    currentWorkspace: "",
  },
};

// registerType
export const registerSample = {
  name: "",
  email: "",
  password: "",
};

// USER
export const userSample = {
  _id: "",
  name: "",
  email: "",
  profilePicture: null,
  isActive: true,
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  currentWorkspace: {
    _id: "",
    name: "",
    owner: "",
    inviteCode: "",
  },
};

export const currentUserResponseSample = {
  message: "",
  user: userSample,
};

// WORKSPACE
export const workspaceSample = {
  _id: "",
  name: "",
  description: "",
  owner: "",
  inviteCode: "",
};

export const createWorkspaceSample = {
  name: "",
  description: "",
};

export const editWorkspaceSample = {
  workspaceId: "",
  data: {
    name: "",
    description: "",
  },
};

export const createWorkspaceResponseSample = {
  message: "",
  workspace: workspaceSample,
};

export const allWorkspaceResponseSample = {
  message: "",
  workspaces: [workspaceSample],
};

export const workspaceWithMembersSample = {
  ...workspaceSample,
  members: [
    {
      _id: "",
      userId: "",
      workspaceId: "",
      role: {
        _id: "",
        name: "",
        permissions: [],
      },
      joinedAt: "",
      createdAt: "",
    },
  ],
};

export const workspaceByIdResponseSample = {
  message: "",
  workspace: workspaceWithMembersSample,
};

export const changeWorkspaceMemberRoleSample = {
  workspaceId: "",
  data: {
    roleId: "",
    memberId: "",
  },
};

export const allMembersInWorkspaceSample = {
  message: "",
  members: [
    {
      _id: "",
      userId: {
        _id: "",
        name: "",
        email: "",
        profilePicture: null,
      },
      workspaceId: "",
      role: {
        _id: "",
        name: "",
      },
      joinedAt: "",
      createdAt: "",
    },
  ],
  roles: [
    {
      _id: "",
      name: "",
    },
  ],
};

export const analyticsResponseSample = {
  message: "",
  analytics: {
    totalTasks: 0,
    overdueTasks: 0,
    completedTasks: 0,
  },
};

export const paginationSample = {
  totalCount: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPages: 0,
  skip: 0,
  limit: 10,
};

// PROJECT
export const projectSample = {
  _id: "",
  name: "",
  emoji: "",
  description: "",
  workspace: "",
  createdBy: {
    _id: "",
    name: "",
    profilePicture: "",
  },
  createdAt: "",
  updatedAt: "",
};

export const createProjectPayloadSample = {
  workspaceId: "",
  data: {
    emoji: "",
    name: "",
    description: "",
  },
};

export const projectResponseSample = {
  message: "Project created successfully",
  project: projectSample,
};

export const editProjectPayloadSample = {
  workspaceId: "",
  projectId: "",
  data: {
    emoji: "",
    name: "",
    description: "",
  },
};

export const allProjectPayloadSample = {
  workspaceId: "",
  pageNumber: 1,
  pageSize: 10,
  keyword: "",
  skip: false,
};

export const allProjectResponseSample = {
  message: "",
  projects: [projectSample],
  pagination: paginationSample,
};

export const projectByIdPayloadSample = {
  workspaceId: "",
  projectId: "",
};

// TASK
export const createTaskPayloadSample = {
  workspaceId: "",
  projectId: "",
  data: {
    title: "",
    description: "",
    priority: TaskPriorityEnumType,
    status: TaskStatusEnumType,
    assignedTo: "",
    dueDate: "",
  },
};

export const editTaskPayloadSample = {
  taskId: "",
  workspaceId: "",
  projectId: "",
  data: {
    title: "",
    description: "",
    priority: TaskPriorityEnumType,
    status: TaskStatusEnumType,
    assignedTo: "",
    dueDate: "",
  },
};

export const taskSample = {
  _id: "",
  title: "",
  description: "",
  project: {
    _id: "",
    emoji: "",
    name: "",
  },
  priority: TaskPriorityEnumType,
  status: TaskStatusEnumType,
  assignedTo: {
    _id: "",
    name: "",
    profilePicture: null,
  },
  createdBy: "",
  dueDate: "",
  taskCode: "",
  createdAt: "",
  updatedAt: "",
};

export const allTaskPayloadSample = {
  workspaceId: "",
  projectId: null,
  keyword: null,
  priority: null,
  status: null,
  assignedTo: null,
  dueDate: null,
  pageNumber: 1,
  pageSize: 10,
};

export const allTaskResponseSample = {
  message: "",
  tasks: [taskSample],
  pagination: paginationSample,
};
