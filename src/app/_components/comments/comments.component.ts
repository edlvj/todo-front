import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Project, Comment } from '../../_models';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommentService } from '../../_services';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html'
})

export class CommentsComponent implements OnInit {
  @Input() task: Task;
  @Input() project: Project;
  @Input() modalRef: BsModalRef;
  comments: Comment[];

  constructor(private commentService: CommentService,
    private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.commentService.getAll(this.project, this.task)
        .subscribe( 
          comments => 
            this.comments = comments;
          errors => {
              this.ngFlashMessageService.showFlashMessage({
                    messages: [errors[0]],
                    dismissible: true, 
                    timeout: false,
                    type: 'danger'
              }) 
          });
  }

  onSubmit(el, form){
    var options = form.value;

    console.log(el.files[0]);

    if(el.files[0]){
      var reader = new FileReader();
      reader.readAsDataURL(el.files[0]);
      console.log("zashlo");

      reader.onload = () => {
        
        options['attachment'] = reader.result;
        console.log(reader.result);
      };
    }  
    
    console.log(options);
   /// form.reset();

    this.commentService.create(this.project, this.task, options)
        .subscribe(comment => {
            this.task.numberOfComments++;
         }, errors => 
               this.ngFlashMessageService.showFlashMessage({
                    messages: [errors[0]], 
                    dismissible: true, 
                    timeout: false,
                    type: 'danger'
                })
        );
  } 
}  