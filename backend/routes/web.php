<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('api/project', [ProjectController::class, 'postProject']);
Route::get('api/projects', [ProjectController::class, 'getProjects']);
Route::delete('api/project/{id}', [ProjectController::class, 'destroyProject']);
Route::put('api/project/{id}', [ProjectController::class, 'putProject']);

Route::post('api/task', [ProjectController::class, 'postTask']);

