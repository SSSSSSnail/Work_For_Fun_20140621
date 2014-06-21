//
//  ViewController.m
//  WFF_20131207
//
//  Created by Snail on 7/12/13.
//  Copyright (c) 2013 Snail. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIWebView *indexWebView;
@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    self.indexWebView.scrollView.bounces = NO;
    self.indexWebView.allowsInlineMediaPlayback = YES;
    self.indexWebView.mediaPlaybackRequiresUserAction = NO;
    [self.indexWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/index.html",[[NSBundle mainBundle] pathForResource:@"Content" ofType:@""]]]]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end