import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import NavContext from "../../context/NavContext";
import AlertContext from "../../context/AlertContext";
import {resizeFile, teamInputValidation} from "../../composable/match";
import {useMutation} from "@apollo/client";
import {INSERT_TEAM} from "../../gql/match";

const CreateTeamView = () => {
    // useState
    const [form, setForm] = useState({
        team_name_mm: "",
        team_name_en: "",
        team_logo: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);
    const {showAlert} = useContext(AlertContext);

    // Start UseEffect
    // for nav link
    useEffect(() => {
        setNavActive("createTeam");
        setMainNav("matches");
    })
    // End UseEffect

    // Start Mutation
    const [insertTeam] = useMutation(INSERT_TEAM, {
        onError: (error) => {
            console.log("Insert Team", error);
        },
        onCompleted: (result) => {
            showAlert("Create Team Successfully", false);
            setForm({
                team_name_mm: "",
                team_name_en: "",
                team_logo: ""
            });
            console.log(result);
        }
    })
    // End Mutation

    // Start Function
    const inputHandle = (e, input) => {
        setForm({...form, [input]: e.target.value});

        if(error[input]){
            delete error[input];
            setError(error);
        }
    };

    // upload Image
    const uploadImage = async (e) => {
        if(e.target.files){
            const base64 = await resizeFile(e.target.files[0]);

            setForm({...form, "team_logo": base64});

            if(error.team_logo){
                delete error.team_logo;
                setError(error);
            }
        }
    }

    // delete all data
    const cancelTeamBtn = (e) => {
        e.preventDefault();
        setError({});
        setForm({
            team_name_mm: "",
            team_name_en: "",
            team_logo: ""
        });
    };

    const createTeamBtn = (e) => {
        e.preventDefault();
        setLoading(true);
        const {errorDetail, errors} = teamInputValidation(form);
        setError(errorDetail);

        if(!errors){
            try{
                insertTeam({variables: form});
            }catch (e) {
                console.log(e.message);
            }
        }
        setLoading(false);
    };
    // End Function

    return (
        <LayoutView>
            <div className="w-full sm:w-12/12 flex justify-center items-start flex-col bg-opacity-90 overflow-hidden py-5">
                <div className="w-11/12 py-5 px-3">
                    <div className="mx-2">
                        <p className={"text-xl sm:text-3xl font-bold"}>Create Team</p>
                    </div>
                </div>

                {/*Start Form*/}
                <form className="w-11/12 grid grid-cols-4 gap-7 mx-4 md:mx-10 mb-5" encType="multipart/form-data">
                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-2 text-gray-500">Team Name (Myanmar)</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.team_name_mm ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.team_name_mm} onChange={(e) => inputHandle(e, "team_name_mm")}/>
                        </div>
                        {
                            error.team_name_mm && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.team_name_mm}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-2 text-gray-500">Team Name (English)</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.team_name_en ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.team_name_en} onChange={(e) => inputHandle(e, "team_name_en")}/>
                        </div>
                        {
                            error.team_name_en && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.team_name_en}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-2 text-gray-500">Team Logo</span>
                            <input type="file" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.team_logo ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} onChange={(e) => uploadImage(e)} accept="image/jpeg, image/png, image/jpg"/>
                        </div>
                        {
                            error.team_logo && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.team_logo}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 justify-self-end">
                        <button className="text-sm bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3 sm:text-base" onClick={cancelTeamBtn} disabled={loading}>Cancel</button>
                        <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-sm text-white rounded shadow hover:bg-blue-400 px-4 py-3  sm:text-base`} onClick={createTeamBtn} disabled={loading}>{loading ? "loading ..." : "Create"}</button>
                    </div>
                </form>
                {/*End Form*/}

            </div>
        </LayoutView>
    )
};

export default CreateTeamView;