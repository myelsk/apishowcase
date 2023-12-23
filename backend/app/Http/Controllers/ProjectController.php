<?php

namespace App\Http\Controllers;

use App\Project;
use App\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function postProject(Request $request) {
        $project = new Project();
        $project->name = $request->input('name');
        $project->save();
        return response()->json([$project], 201);
    }

    public function getProjects() {
        $projects = DB::table('projects')->get();
        return response()->json(['projects' => $projects, 'status' => 200]);
    }

    public function destroyProject(Request $request, $id) {
        DB::table('projects')->where('id', '=', $id)->delete();
        DB::table('tasks')->where('project_id', '=', $request->input('id'))->delete();
    }

    public function putProject(Request $request, $id) {
        $project = Project::find($id);
        $project->name = $request->input('name');
        $project->save();
        return response()->json($project, 200);
    }


    public function postTask(Request $request) {
        $task = new Task();
        $task->name = $request->input('name');
        $task->project_id = $request->input('project_id');
        $task->isDone = false;
        $task->save();
        return response()->json([$task], 201);
    }
}
