import { defineStore, createPinia } from 'pinia';
import {v4 as uuid} from 'uuid';

export interface Todo{
	id: string;
	title: string;
	done: boolean;
	createAt: Date;
	updatedAt: Date;
};

export interface TodoAdd{
	title: string;
}

export interface TodoUpdate{
	done?: boolean;
}

export interface TodoState{
	items: Todo[];
	selectedValue: string;
	newTask: string;
}

const state = (): TodoState => ({
	items: [],
	selectedValue: '1',
	newTask: '',
});

const getters = {
	getById: (state: TodoState) => (id: string) => {
		return state.items.find(item => item.id === id);
	},
	getDoneTodos: (state: TodoState) => () => {
		return state.items.filter(item => item.done);
	},
	getUnDoneTodos: (state: TodoState) => () => {
		return state.items.filter(item => !item.done);
	},
	getAll: (state: TodoState) => () => {
		return state.items;
	},
};

export const useTodoTaskStore = defineStore("todoStore", {
	state,
	getters,
	actions: {
		add(task: string){
			const todo: Todo = {
				id: uuid(),
				title: task,
				done: false,
				createAt: new Date(),
				updatedAt: new Date(),
			}
			if(task){
				this.items.push(todo);
			}
		},
		remove(id: string){
			this.items = this.items.filter((todo: Todo) => todo.id !== id);
		},
		update(id: string, update: TodoUpdate){
			const index = this.items.findIndex((item: Todo) => item.id === id);
			this.items[index] = {
				...this.items[index],
				...update,
				updatedAt: new Date(),
			}
		}
	}
});