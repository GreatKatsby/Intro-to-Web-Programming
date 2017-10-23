"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0",
		appStorage = new AppStorage("taskAtHand");

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#new-task-name").keypress(function(e){
			if(e.which == 13){
				addTask();
				return false;
			}
		})
		.focus();
		
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
	}; // End of this.start
	
	function addTask(){
		var taskName = $("#new-task-name").val();
		if(taskName){
			addTaskElement(taskName);
			
			//Reset the text field
			$("#new-task-name").val("").focus();
		}
		saveTaskList();
	} // End of addTask
	
	function addTaskElement(taskName){
		var $task = $("#task-template .task").clone();
		
		$("span.task-name", $task).text(taskName);
		
		$("#task-list").append($task);
		
		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function(){
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function(){
			moveTask($task, false);
		});
		
		$("span.task-name", $task).click(function(){
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function(){
			onChangeTaskName($(this));
		})
		.blur(function(){
			$(this).hide().siblings("span.task-name").show();
		});
	} // End of addTaskElement
	
	function removeTask($task){
		$task.remove();
		saveTaskList();
	} // End of removeTask
	
	function moveTask($task, moveUp){
		if(moveUp){
			$task.insertBefore($task.prev());
		}else{
			$task.insertAfter($task.next());
		}
		
		saveTaskList();
	}
	
	function onEditTaskName($span){
		$span.hide().siblings("input.task-name")
		.val($span.text())
		.show().focus();
	} // End of onEditTaskName
	
	function onChangeTaskName($input){
		$input.hide();
		var $span = $input.siblings("span.task-name");
		
		if($input.val()){
			$span.text($input.val());
		}
		
		$span.show();
		
		saveTaskList();
	} // End of onChangeTaskName
	
	function saveTaskList(){
		var tasks = [];
		$("#task-list .task span.task-name").each(function(){
			tasks.push($(this).text());
		});
		
		appStorage.setValue("taskList", tasks);
	}
	
	function loadTaskList(){
		var tasks = appStorage.getValue("taskList");
		if(tasks){
			for(var i in tasks){
				addTaskElement(tasks[i]);
			}
		}
	}
	
} // end TaskAtHandApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});



