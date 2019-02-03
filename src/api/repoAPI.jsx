import {axiosProtected} from "./config";

class RepoAPI{
	static getRepoContent(folder_id){

		return axiosProtected(`admin/retrieveRepoContentByFolder/${folder_id}`)
		.then((response) => {
			var data = response.data;

			switch (response.status) {
				case 200: {
					return ({ success: true, content: data.content });
				}
				case 302: {
					return {
						success: false,
						error: {
							status: response.status
						}
					};
				}
			}
		}).catch((response) => {
			if (response.response.status !== 200) {
				return {
					success: false, 
					error: {
						status: response.status
					}
				};
			}
		});
	}
    
	static createFolderinRepo(parentFolder, folderName) {
		return axiosProtected({
			url: `admin/repoFolder/root`,
			method: "POST",
			data: {
				parentId: parentFolder,
				name: folderName
			}
		}).then((response) => {
			if (response.status === 200) {
				return { success: true };
			}

		}).catch((response) => {
			if (response.response.status !== 200) {
				return {
					success: false,
					error: {
						status: response.response.status
					}
				};
			}
		});
	}
    
	static uploadFiletoRepo(parentFolder, folderName) {
		return axiosProtected({
			url: `admin/repoFolder/root`,
			method: "POST",
			data: {
				parentId: parentFolder,
				name: folderName
			}
		}).then((response) => {
			if (response.status === 200) {
				return { success: true };
			}

		}).catch((response) => {
			if (response.response,status !== 200) {
				return {
					success: false,
					error: {
						status: response.response.status
					}
				};
			}
		});
	}
    
	static deleteFileFromRepo(fileId, delChoice){
		return axiosProtected({
			url: `admin/repoFile/${fileId}`,
			method: delChoice ? "DELETE" : "GET"
		}).then((response) => {
			if (response.status == 200) {
				return ({ success: true });
			}
		}).catch((response) => {
			switch (response.response.status) {
				default: {
					return {
						error: {
							status: response.response.status,
							message: "Accesss to server failed. Please try again later!"
						}
					};
				}
			}
		});
	}
}

export default RepoAPI;