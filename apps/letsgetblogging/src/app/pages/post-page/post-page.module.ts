import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@lgc/ui';

import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';
import { NewPostCommentComponent } from './new-post-comment/new-post-comment.component';
import { PostPageDependenciesModule } from './post-page-dependencies.module';


@NgModule({
  declarations: [PostPageComponent, NewPostCommentComponent],
  imports: [
    CommonModule,
    PostPageDependenciesModule,
    PostPageRoutingModule,
    UiModule,
    ReactiveFormsModule
  ],
})
export class PostPageModule {}
