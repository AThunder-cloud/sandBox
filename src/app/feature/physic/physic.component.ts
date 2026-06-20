import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-physic',
  templateUrl: './physic.component.html',
  styleUrl: './physic.component.scss',
  imports: [
    SearchComponent
  ],
})
export class PhysicComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;


  @HostListener('window:resize')
  onResize() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  ngAfterViewInit() {
    // this.initScene();
    // this.animate();
  }

  ngOnDestroy() {
    // cancelAnimationFrame(this.animationId);
    // this.renderer.dispose();
  }

  private initScene() {
    const width = this.container?.nativeElement?.clientWidth;
    const height = this.container?.nativeElement?.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.container.nativeElement.appendChild(this.renderer.domElement);
 
    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshMatcapMaterial({ color: 0x00ff99 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    // Store cube reference
    this.cube = cube;
  }

  private cube!: THREE.Mesh;

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
}
