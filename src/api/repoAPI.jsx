import axios from "axios";

import {API_URL} from "../abstract/variables";

// eslint-disable-next-line no-unused-vars
var urls ={
	url: {
		uploadFiletoRepo: `${API_URL}admin/uploadFiletoRepo/`,
		createFolderinRepo: "",
		deleteFolderFromRepo: `${API_URL}admin/repoFolder/`
	},
};

class RepoAPI{
	static getRepoContent(folder_id){

		return new Promise((resolve) => {
			axios({
				url: `${API_URL}admin/retrieveRepoContentByFolder/${folder_id}`,
				method: "GET",
			}).then((response) => {
				var data = response.data;

				switch (response.status) {
				case 200: {
					resolve({content: data.content});
					break;
				}
				case 302: {
					resolve({
						error: {
							status: response.status
						}
					});
					break;
				}
				}
			}).catch((response) => {
				if (response.status !== 200){
					resolve({
						error: {
							status: response.status
						}
					});
				}
			});
		});
	}
    
	static createFolderinRepo(parentFolder, folderName) {
		return new Promise((resolve) => {
			axios({
				url: `${API_URL}admin/repoFolder/root`,
				method: "POST",
				data: {
					parentId: parentFolder,
					name: folderName
				}
			}).then((response) => {
				if(response.status === 200){
					resolve({ success: true });
				}
                
			}).catch((response) => {
				if (response.status !== 200) {
					resolve({
						error: {
							status: response.status
						}
					});
				}
			});
		});
	}
    
	static uploadFiletoRepo(parentFolder, folderName) {
		return new Promise((resolve) => {
			axios({
				url: `${API_URL}admin/repoFolder/root`,
				method: "POST",
				data: {
					parentId: parentFolder,
					name: folderName
				}
			}).then((response) => {
				if (response.status === 200) {
					resolve({ success: true });
				}

			}).catch((response) => {
				if (response.status !== 200) {
					resolve({
						error: {
							status: response.status
						}
					});
				}
			});
		});
	}
    
	static deleteFileFromRepo(fileId, delChoice){
		return new Promise((resolve)=>{
			axios({
				url: `${API_URL}admin/repoFile/${fileId}`,
				method: delChoice ? "DELETE" : "GET"
			}).then((response) => {
				if(response.status == 200){
					resolve({success: true});
				}
			}).catch((response)=>{
				switch(response.status){
				default: {
					resolve({
						error: {
							status: response.status,
							message: "Accesss to server failed. Please try again later!"
						}
					});
				}
				}
			});
		});
	}
}

export default RepoAPI;